// @ts-nocheck
require('dotenv').config()
const {createClient} = require('@sanity/client')
const {parse} = require('csv-parse/sync')
const fs = require('fs')
const path = require('path')
const {importConfig} = require('./import-hotels.config')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
})

// Helper function for image upload
async function uploadImageFromPath(imagePath) {
  try {
    if (!imagePath) return null

    const baseImagePath = path.join(__dirname, importConfig.imagesPath)
    const fullImagePath = path.join(baseImagePath, imagePath)

    if (!fs.existsSync(fullImagePath)) {
      console.warn(`Image not found at path: ${fullImagePath}`)
      return null
    }

    const imageStream = fs.createReadStream(fullImagePath)
    const imageAsset = await client.assets.upload('image', imageStream, {
      filename: path.basename(fullImagePath),
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      },
    }
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error)
    return null
  }
}

// Helper function for handling category references
async function createOrFindCategory(categorySlug) {
  try {
    if (!categorySlug) return null

    // Convert slug to name (e.g., "business-hotels" -> "Business Hotels")
    const categoryName = categorySlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // First try to find existing category by value (slug)
    const existingCategory = await client.fetch(
      `*[_type == "hotelCategory" && value.current == $slug && language == $language && $edition in edition][0]`,
      {
        slug: categorySlug,
        language: importConfig.language,
        edition: importConfig.edition,
      },
    )

    if (existingCategory) {
      return existingCategory._id
    }

    // If not found, create new category
    const newCategory = await client.create({
      _type: 'hotelCategory',
      label: categoryName,
      value: {
        current: categorySlug,
      },
      language: importConfig.language,
      edition: [importConfig.edition],
    })

    return newCategory._id
  } catch (error) {
    console.error(`Error handling category with slug: ${categorySlug}`, error)
    return null
  }
}

// Helper function for handling city references
async function createOrFindCity(cityName) {
  try {
    if (!cityName) return null

    const existingCity = await client.fetch(`*[_type == "city" && name == $name][0]`, {
      name: cityName,
    })

    if (existingCity) {
      return existingCity._id
    }

    const newCity = await client.create({
      _type: 'city',
      name: cityName,
    })

    return newCity._id
  } catch (error) {
    console.error(`Error handling city: ${cityName}`, error)
    return null
  }
}

// Helper function for handling country references
async function createOrFindCountry(countryName) {
  try {
    if (!countryName) return null

    const existingCountry = await client.fetch(`*[_type == "country" && name == $name][0]`, {
      name: countryName,
    })

    if (existingCountry) {
      return existingCountry._id
    }

    const newCountry = await client.create({
      _type: 'country',
      name: countryName,
    })

    return newCountry._id
  } catch (error) {
    console.error(`Error handling country: ${countryName}`, error)
    return null
  }
}

// Helper function for handling address
async function createAddress(record) {
  try {
    // First check if address already exists
    const existingAddress = await client.fetch(
      `*[_type == "address" && 
        street == $street && 
        streetNumber == $streetNumber && 
        postalCode == $postalCode][0]`,
      {
        street: record['Hotel Adresse/Street and Number/Street'],
        streetNumber: record['Hotel Adresse/Street and Number/Number'],
        postalCode: record['Hotel Adresse/Postal Code and City/Postal Code'],
      },
    )

    if (existingAddress) {
      return existingAddress._id
    }

    // Get or create city and country references
    const cityRef = await createOrFindCity(record['Hotel Adresse/Postal Code and City/City'])
    const countryRef = await createOrFindCountry(record['Hotel Adresse/Country'])

    const addressDoc = {
      _type: 'address',
      street: record['Hotel Adresse/Street and Number/Street'],
      streetNumber: record['Hotel Adresse/Street and Number/Number'],
      postalCode: record['Hotel Adresse/Postal Code and City/Postal Code'],
      city: cityRef
        ? {
            _type: 'reference',
            _ref: cityRef,
          }
        : undefined,
      country: countryRef
        ? {
            _type: 'reference',
            _ref: countryRef,
          }
        : undefined,
    }

    const created = await client.create(addressDoc)
    return created._id
  } catch (error) {
    console.error('Error creating address:', error)
    return null
  }
}

// Helper function for validating hotel type fields
function validateHotelFields(record) {
  const validVariants = ['special', 'classic']
  const validHotelTypes = ['classic', 'exclusive', 'grand', 'premium']
  const validSegments = ['leisure', 'business']

  if (!validVariants.includes(record['Hotel Type'])) {
    throw new Error(
      `Invalid hotel variant: ${record['Hotel Type']}. Must be one of: ${validVariants.join(', ')}`,
    )
  }

  if (!validHotelTypes.includes(record['Hotel Package'])) {
    throw new Error(
      `Invalid hotel package: ${record['Hotel Package']}. Must be one of: ${validHotelTypes.join(', ')}`,
    )
  }

  if (record['Hotel Segment'] && !validSegments.includes(record['Hotel Segment'])) {
    throw new Error(
      `Invalid segment: ${record['Hotel Segment']}. Must be one of: ${validSegments.join(', ')}`,
    )
  }

  if (!record['language']) {
    record['language'] = importConfig.language
  }

  if (!record['edition']) {
    record['edition'] = importConfig.edition
  }

  return record
}

// Helper function for handling achievements
async function createOrFindAchievements(achievements) {
  try {
    if (!achievements) return []

    const achievementsList = achievements
      .split('|')
      .map((a) => a.trim())
      .filter(Boolean)
    const achievementRefs = []

    for (const achievementSlug of achievementsList) {
      // First try to find by name (converted from slug)
      const achievementName = achievementSlug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      const existing = await client.fetch(`*[_type == "achivement" && name == $name][0]`, {
        name: achievementName,
      })

      if (existing) {
        achievementRefs.push({
          _type: 'reference',
          _ref: existing._id,
        })
      } else {
        // Create new achievement if not found
        const newAchievement = await client.create({
          _type: 'achivement',
          name: achievementName,
        })

        achievementRefs.push({
          _type: 'reference',
          _ref: newAchievement._id,
        })
      }
    }

    return achievementRefs
  } catch (error) {
    console.error('Error handling achievements:', error)
    return []
  }
}

// Helper function for handling brand images
async function createBrandImages(images) {
  try {
    if (!images) return []

    const brandImageRefs = []
    for (const imagePath of images.split('|')) {
      if (!imagePath.trim()) continue

      const imageName = path.basename(imagePath, path.extname(imagePath))
      const uploadedImage = await uploadImageFromPath(imagePath.trim())

      if (uploadedImage) {
        const brandImage = await client.create({
          _type: 'images',
          name: imageName,
          image: uploadedImage,
        })

        brandImageRefs.push({
          _type: 'reference',
          _ref: brandImage._id,
        })
      }
    }

    return brandImageRefs
  } catch (error) {
    console.error('Error handling brand images:', error)
    return []
  }
}

// Helper function for handling image section (ads)
async function createImageSection(record) {
  try {
    if (!record['Adds Section/Image']) return null

    const image = await uploadImageFromPath(record['Adds Section/Image'])
    if (!image) return null

    const imageSection = await client.create({
      _type: 'imageSection',
      language: importConfig.language,
      title: record['Adds Section/Title'] || 'Ad',
      internalName: record['Adds Section/Internal Name'] || `Ad for ${record['Hotel Name']}`,
      images: [
        {
          image: image,
          link: record['Adds Section/Link'] || '',
          alt: record['Adds Section/Alt Text'] || '',
        },
      ],
    })

    return imageSection._id
  } catch (error) {
    console.error('Error creating image section:', error)
    return null
  }
}

async function createHotelDocument(record) {
  try {
    // Validate hotel fields
    record = validateHotelFields(record)

    // Handle references first
    const categoryId = await createOrFindCategory(record['Hotel Kategorie'])
    const addressId = await createAddress(record)
    const achievementRefs = await createOrFindAchievements(record['Achievements'])
    const brandImageRefs = await createBrandImages(record['Brand Images'])
    const imageSectionId = await createImageSection(record)

    // Create slug from hotel name
    const slug =
      record['Slug'] ||
      record['Hotel Name']
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

    // Prepare the hotel document
    const hotelDoc = {
      _type: 'hotel',
      language: importConfig.language,
      edition: importConfig.edition,
      variant: record['Hotel Type'],
      hotelType: record['Hotel Package'],
      segment: record['Hotel Segment'],
      name: record['Hotel Name'],
      isPackageBooked: record['Hotel hat Paket gebucht'] === 'TRUE',
      slug: {current: slug},

      // References
      category: categoryId
        ? {
            _type: 'reference',
            _ref: categoryId,
          }
        : undefined,

      address: addressId
        ? {
            _type: 'reference',
            _ref: addressId,
          }
        : undefined,

      achievements: achievementRefs,

      // CTA Button
      ctaButton: record['CTA Button/CTA Button Text']
        ? {
            text: record['CTA Button/CTA Button Text'],
            url: record['CTA Button/CTA Button URL'],
          }
        : undefined,

      // Ranking
      ranking: {
        position: record['Ranking Einstellungen/Ranking Position']
          ? parseInt(record['Ranking Einstellungen/Ranking Position'])
          : undefined,
        category: record['Ranking Einstellungen/Special Edition Kategorie'],
      },

      // Primary Hero Section
      primaryHeroSection: record['Primary Hero Section/Hotel Image']
        ? {
            image: await uploadImageFromPath(record['Primary Hero Section/Hotel Image']),
          }
        : undefined,

      // Secondary Hero Section
      secondaryHeroSection: record['Secondary Hero Section/Hero Image']
        ? {
            image: await uploadImageFromPath(record['Secondary Hero Section/Hero Image']),
            brandImages: brandImageRefs,
          }
        : undefined,

      // Hotel Details Section
      hotelDetailsSection: record['Hotel Details Section/Hotel Image']
        ? {
            image: await uploadImageFromPath(record['Hotel Details Section/Hotel Image']),
            description: record['Hotel Details Section/Description'],
            brandImages: brandImageRefs,
          }
        : undefined,

      // Hotel Info Premium Section
      hotelInfoPremium: record['Hotel Info Section (Premium)/Person/Person Name']
        ? {
            Person: {
              name: record['Hotel Info Section (Premium)/Person/Person Name'],
              host: record['Hotel Info Section (Premium)/Person/Person Host'],
              role: record['Hotel Info Section (Premium)/Person/Person Role'],
              image: await uploadImageFromPath(
                record['Hotel Info Section (Premium)/Person/Person Image'],
              ),
            },
            title: record['Hotel Info Section (Premium)/Popup Title'],
            description: record['Hotel Info Section (Premium)/Description'],
          }
        : undefined,

      // Interview Section
      interviewSection: record['Interview Section/Title']
        ? {
            title: record['Interview Section/Title'],
            manager: {
              name: record['Interview Section/Hotel Manager/Manager Name'],
              role: record['Interview Section/Hotel Manager/Manager Role'],
              image: await uploadImageFromPath(
                record['Interview Section/Hotel Manager/Manager Photo'],
              ),
            },
            exclusiveQuestions: record['Interview Section/Questions & Answers (EXCLUSIVE)/Question']
              ? [
                  {
                    question: record['Interview Section/Questions & Answers (EXCLUSIVE)/Question'],
                    answer: record['Interview Section/Questions & Answers (EXCLUSIVE)/Answer'],
                  },
                ]
              : undefined,
            grandQuestions: record['Interview Section/Questions & Answers (GRAND)/Question']
              ? [
                  {
                    question: record['Interview Section/Questions & Answers (GRAND)/Question'],
                    answer: record['Interview Section/Questions & Answers (GRAND)/Answer'],
                  },
                ]
              : undefined,
          }
        : undefined,

      // Map Section
      mapSection: {
        headline: record['Map Section/Headline'] || 'Hier werden Sie sein',
        contactInfo: {
          phone: record['Map Section/Hotel Contact Information/Phone Number'],
          email: record['Map Section/Hotel Contact Information/Email Address'],
          website: record['Map Section/Hotel Contact Information/Website URL'],
        },
      },

      // Adds Section (renamed from adds to add)
      add: imageSectionId
        ? {
            _type: 'reference',
            _ref: imageSectionId,
          }
        : undefined,
    }

    // Handle main cover image
    if (record['Hotel Cover Image']) {
      hotelDoc.image = await uploadImageFromPath(record['Hotel Cover Image'])
    }

    // Remove any undefined fields
    Object.keys(hotelDoc).forEach((key) => hotelDoc[key] === undefined && delete hotelDoc[key])

    return hotelDoc
  } catch (error) {
    console.error(`Error creating hotel document for ${record['Hotel Name']}:`, error)
    throw error
  }
}

async function importHotels(csvPath) {
  try {
    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    })

    const testRecords = importConfig.limit ? records.slice(0, importConfig.limit) : records
    console.log(
      `Found ${testRecords.length} hotels to import${importConfig.limit ? ' (limited by config)' : ''}.`,
    )

    for (const [i, record] of testRecords.entries()) {
      try {
        console.log(`[${i + 1}/${testRecords.length}] Processing: ${record['Hotel Name']}`)

        const hotelDoc = await createHotelDocument(record)
        const created = await client.create(hotelDoc)

        console.log(
          `[${i + 1}/${testRecords.length}] Created hotel: ${record['Hotel Name']} (ID: ${created._id})`,
        )

        // Publish the document
        await client.patch(created._id).set({}).commit({autoGenerateArrayKeys: true})
        console.log(`[${i + 1}/${testRecords.length}] Published hotel: ${record['Hotel Name']}`)
      } catch (err) {
        console.error(
          `[${i + 1}/${testRecords.length}] Error processing hotel: ${record['Hotel Name']}`,
        )
        console.error(err)
      }
    }
    console.log('Import completed!')
  } catch (error) {
    console.error('Error during import:', error)
  }
}

// Run the import
const csvFile = path.join(__dirname, importConfig.csvPath)
importHotels(csvFile)
