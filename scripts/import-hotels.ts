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
  // token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN ,
  token:
    'skllilIUtUdeLKJqMx4VDWyBSZT1I9t0kAAQhRT2WkfILYG6uj44v35wLW0ChaYYZJO0PafFkhnmKi71r8ta2emMUmW3dKa5CWCEvTlFm5bhONSGFH5o5xqyJi8zgKYqSHEUJnjri1uoKIOEN1yOJ4z1FFatF6Nf9EMdmKPr7wFc2jsd9iOt',
  useCdn: false,
})

// Add new function to delete existing hotels
async function deleteExistingHotels() {
  try {
    console.log(
      `Deleting existing hotels for edition: ${importConfig.edition}, language: ${importConfig.language}...`,
    )

    // Query to find all hotels matching the edition and language
    const query = `*[_type == "hotel" && language == $language]._id`
    const params = {
      // edition: importConfig.edition,
      language: importConfig.language,
    }

    // Get all matching hotel IDs
    const hotelIds = await client.fetch(query, params)

    if (hotelIds.length === 0) {
      console.log('No existing hotels found to delete.')
      return
    }

    console.log(`Found ${hotelIds.length} hotels to delete.`)

    // Delete hotels in batches to avoid overwhelming the API
    const batchSize = 50
    for (let i = 0; i < hotelIds.length; i += batchSize) {
      const batch = hotelIds.slice(i, i + batchSize)
      const transaction = client.transaction()

      batch.forEach((id) => {
        transaction.delete(id)
      })

      await transaction.commit()
      console.log(
        `Deleted batch of ${batch.length} hotels (${i + batch.length}/${hotelIds.length})`,
      )
    }

    console.log('Successfully deleted all existing hotels.')
  } catch (error) {
    console.error('Error deleting existing hotels:', error)
    throw error
  }
}

// Helper function for image upload
async function uploadImageFromPath(imagePath) {
  try {
    if (!imagePath) return null

    const baseImagePath = path.join(__dirname, importConfig.imagesPath)
    const fullImagePath = path.join(baseImagePath, imagePath)
    let imageToUpload = fullImagePath

    if (!fs.existsSync(fullImagePath)) {
      console.warn(`Image not found at path: ${fullImagePath}, using dummy image instead`)
      imageToUpload = path.join(__dirname, 'images', 'dummy-image.png')

      // If even the dummy image doesn't exist, return null
      if (!fs.existsSync(imageToUpload)) {
        console.error('Dummy image not found at path:', imageToUpload)
        return null
      }
    }

    const imageStream = fs.createReadStream(imageToUpload)
    const imageAsset = await client.assets.upload('image', imageStream, {
      filename: path.basename(imageToUpload),
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

    // Validate inputs
    if (typeof categorySlug !== 'string' || !categorySlug.trim()) {
      console.error('Category slug must be a non-empty string')
      return null
    }

    // Validate edition against allowed values
    const allowedEditions = ['deutschland', 'schweiz', 'dach']
    const currentEdition = importConfig.edition
    if (!allowedEditions.includes(currentEdition)) {
      console.error(
        `Invalid edition: ${currentEdition}. Must be one of: ${allowedEditions.join(', ')}`,
      )
      return null
    }

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

    // Prepare category document with all required fields
    const categoryDoc = {
      _type: 'hotelCategory',
      label: categoryName,
      value: {
        _type: 'slug',
        current: categorySlug
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/&/g, 'and')
          .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ''),
      },
      language: importConfig.language,
      edition: [importConfig.edition],
    }

    // Validate required fields
    if (!categoryDoc.label) {
      throw new Error('Category label is required')
    }
    if (!categoryDoc.value.current) {
      throw new Error('Category value (slug) is required')
    }
    if (!categoryDoc.edition || categoryDoc.edition.length === 0) {
      throw new Error('At least one edition is required')
    }

    // Create new category
    const newCategory = await client.create(categoryDoc)
    console.log(
      `Created new category: ${categoryName} [${importConfig.language}] (${importConfig.edition})`,
    )
    return newCategory._id
  } catch (error) {
    console.error(`Error handling category with slug: ${categorySlug}`, error)
    return null
  }
}

// Helper function to create or get city reference
async function getOrCreateCityReference(client, cityName, editions = importConfig.edition) {
  // Search for existing city using the correct field name (label)
  const existingCity = await client.fetch(`*[_type == "city" && label == $cityName][0]`, {cityName})

  if (existingCity) {
    return {
      _type: 'reference',
      _ref: existingCity._id,
    }
  }

  // Create new city if it doesn't exist using the correct field structure
  const newCity = await client.create({
    _type: 'city',
    label: cityName, // Changed from name to label
    value: {
      _type: 'slug',
      current: cityName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/&/g, 'and')
        .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, ''),
    },
    edition: editions.map((edition) => edition.toLowerCase()), // Make sure editions are lowercase
  })

  return {
    _type: 'reference',
    _ref: newCity._id,
  }
}

// Helper function to create or get country reference
// async function getOrCreateCountryReference(client, countryName) {
//   // Search for existing country
//   const existingCountry = await client.fetch(`*[_type == "country" && name == $countryName][0]`, {
//     countryName,
//   })

//   if (existingCountry) {
//     return {
//       _type: 'reference',
//       _ref: existingCountry._id,
//     }
//   }

//   // Create new country if it doesn't exist
//   const newCountry = await client.create({
//     _type: 'country',
//     name: countryName,
//   })

//   return {
//     _type: 'reference',
//     _ref: newCountry._id,
//   }
// }

// Helper function for handling address
async function createAddress(record) {
  try {
    // Extract fields and convert to string before trimming
    const street = String(record['Hotel Adresse/Street and Number/Street'] || '').trim()
    const streetNumber = String(record['Hotel Adresse/Street and Number/Number'] || '').trim()
    const postalCode = String(record['Hotel Adresse/Postal Code and City/Postal Code'] || '').trim()
    const cityName = String(record['Hotel Adresse/Postal Code and City/City'] || '').trim()
    const countryName = String(record['Hotel Adresse/Country'] || '').trim()

    // Log the values for debugging
    console.log('Address fields:', {
      street,
      streetNumber,
      postalCode,
      cityName,
      countryName,
    })

    // Validate required fields
    if (!street) {
      console.error('Missing street for hotel:', record['Hotel Name'])
      throw new Error('Street is required')
    }
    if (!postalCode) {
      console.error('Missing postal code for hotel:', record['Hotel Name'])
      throw new Error('Postal code is required')
    }
    if (!cityName) {
      console.error('Missing city for hotel:', record['Hotel Name'])
      throw new Error('City is required')
    }
    if (!countryName) {
      console.error('Missing country for hotel:', record['Hotel Name'])
      throw new Error('Country is required')
    }

    // First check if address already exists
    const existingAddress = await client.fetch(
      `*[_type == "address" && 
        street == $street && 
        streetNumber == $streetNumber && 
        postalCode == $postalCode &&
        city->label == $cityName][0]`,
      {
        street,
        streetNumber,
        postalCode,
        cityName,
        // countryName,
      },
    )

    if (existingAddress) {
      return existingAddress._id
    }

    // Get or create city and country references
    const cityRef = await getOrCreateCityReference(client, cityName, [
      record['Edition']?.toLowerCase(),
    ])
    const countryRef = {
      _type: 'reference',
      _ref: countryName,
    }

    const addressDoc = {
      _type: 'address',
      street,
      streetNumber: streetNumber || undefined,
      postalCode,
      city: cityRef,
      country: countryRef,
    }

    const created = await client.create(addressDoc)
    console.log(
      `Created new address: ${street} ${streetNumber}, ${postalCode} ${cityName}, ${countryName}`,
    )
    return created._id
  } catch (error) {
    console.error('Error creating address:', error)
    throw error // Re-throw to handle at higher level
  }
}

// Helper function for validating hotel type fields
function validateHotelFields(record) {
  const validVariants = ['special', 'classic']
  const validHotelTypes = ['classic', 'exclusive', 'grand', 'premium']
  const validSegments = ['leisure', 'business']

  // Convert values to lowercase for validation
  const variant = record['Hotel Type']?.toLowerCase()
  let hotelType = (record['Hotel Package'] || 'classic')?.toLowerCase()
  const segment = record['Hotel Segment']?.toLowerCase()

  // Convert 'basic' to 'classic'
  if (hotelType === 'basic') {
    hotelType = 'classic'
  }

  if (!validVariants.includes(variant)) {
    throw new Error(
      `Invalid hotel variant: ${record['Hotel Type']}. Must be one of: ${validVariants.join(', ')}`,
    )
  }

  if (!validHotelTypes.includes(hotelType)) {
    throw new Error(
      `Invalid hotel package: ${record['Hotel Package'] || 'classic'}. Must be one of: ${validHotelTypes.join(', ')}`,
    )
  }

  if (segment && !validSegments.includes(segment)) {
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

  // Update the record with lowercase and converted values
  record['Hotel Type'] = variant
  record['Hotel Package'] = hotelType // This will now be 'classic' instead of 'basic'
  if (record['Hotel Segment']) {
    record['Hotel Segment'] = segment
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
      .filter(Boolean) // Keep any non-empty achievement
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

// Helper function to handle pipe-separated reference IDs
function createReferences(referenceString) {
  if (!referenceString) return undefined

  return referenceString
    .split('|')
    .map((id) => id.trim())
    .filter(Boolean) // Remove empty strings
    .map((id) => ({
      _type: 'reference',
      _ref: id,
    }))
}

// Helper function for handling brand images
async function createBrandImages(images) {
  try {
    if (!images) return []

    const brandImageRefs = []
    const imagesList = images.split('|')

    for (let i = 0; i < imagesList.length; i++) {
      const imagePath = imagesList[i].trim()
      if (!imagePath) continue

      const imageName = path.basename(imagePath, path.extname(imagePath))
      const uploadedImage = await uploadImageFromPath(imagePath)

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

const slugify = (input: string) => {
  const umlautMap: {[key: string]: string} = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    ß: 'ss',
    æ: 'ae',
    ø: 'oe',
    é: 'e',
    è: 'e',
    ê: 'e',
    ë: 'e',
    á: 'a',
    à: 'a',
    â: 'a',
    ã: 'a',
    ñ: 'n',
    ó: 'o',
    ò: 'o',
    ô: 'o',
    õ: 'o',
    ú: 'u',
    ù: 'u',
    û: 'u',
    ý: 'y',
    ÿ: 'y',
    Ä: 'ae',
    Ö: 'oe',
    Ü: 'ue',
  }

  return (
    input
      .toLowerCase()
      // Replace umlauts and special characters
      .replace(/[äöüßæøéèêëáàâãñóòôõúùûýÿÄÖÜ]/g, (char) => umlautMap[char] || char)
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Replace ampersand with 'and'
      .replace(/&/g, 'and')
      // Remove all other special characters
      .replace(/[^a-z0-9-]/g, '')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
  )
}

// Helper function to transform edition title to value
function transformEdition(title) {
  if (!title) return importConfig.edition // fallback to config if no title provided

  const editionMap = {
    Deutschland: 'deutschland',
    DACH: 'dach',
    Schweiz: 'schweiz',
  }

  return editionMap[title] || importConfig.edition // fallback to config if no match found
}

// Helper function to transform ranking category label to value
function transformRankingCategory(label) {
  if (!label) return null

  const categoryMap = {
    'International Luxury Partners': 'luxury',
    "Editor's Choice": 'editors-choice',
    'New Hotel Openings': 'new',
  }

  return categoryMap[label] || null
}

// Helper function to format text with bold and color markers
function formatText(text) {
  // Split by formatting markers while preserving them
  const parts = text.match(/(\*\*[^*]+\*\*|\#[^#]+\#|[^*#]+)/g) || [text]
  let formattedText = text

  for (const part of parts) {
    // Check for bold text with color inside: **#text#**
    if (part.startsWith('**') && part.endsWith('**') && part.includes('#')) {
      const innerText = part.slice(2, -2).trim()
      if (innerText.startsWith('#') && innerText.endsWith('#')) {
        formattedText = formattedText.replace(
          part,
          `<strong><span class="colored-text">${innerText.slice(1, -1)}</span></strong>`,
        )
      }
    }
    // Check for colored text with bold inside: #**text**#
    else if (part.startsWith('#') && part.endsWith('#') && part.includes('**')) {
      const innerText = part.slice(1, -1).trim()
      if (innerText.startsWith('**') && innerText.endsWith('**')) {
        formattedText = formattedText.replace(
          part,
          `<span class="colored-text"><strong>${innerText.slice(2, -2)}</strong></span>`,
        )
      }
    }
    // Check for bold text: **text**
    else if (part.startsWith('**') && part.endsWith('**')) {
      formattedText = formattedText.replace(part, `<strong>${part.slice(2, -2)}</strong>`)
    }
    // Check for colored text: #text#
    else if (part.startsWith('#') && part.endsWith('#')) {
      formattedText = formattedText.replace(
        part,
        `<span class="colored-text">${part.slice(1, -1)}</span>`,
      )
    }
  }

  return formattedText
}

// Helper function to convert body text to blockContent with components
async function toBlockContentWithComponents(text) {
  if (!text) return undefined

  const blocks = []
  const regex = /\[(DESC|IMG)\](.*?)\[\/\1\]/g
  let match

  while ((match = regex.exec(text)) !== null) {
    const [_, type, content] = match

    switch (type) {
      case 'DESC':
        // Handle descriptions using descriptionGrid component with simple text
        if (content.trim()) {
          const descriptions = content
            .split('|')
            .map((desc) => desc.trim())
            .filter(Boolean)

          if (descriptions.length > 0) {
            blocks.push({
              _type: 'descriptionGrid',
              _key: Math.random().toString(36).substring(2, 15),
              descriptions: descriptions,
            })
          }
        }
        break

      case 'IMG':
        // Handle full width images
        if (content.trim()) {
          try {
            const uploadedImage = await uploadImageFromPath(content.trim())
            if (uploadedImage) {
              blocks.push({
                _type: 'fullWidthImage',
                _key: Math.random().toString(36).substring(2, 15),
                image: uploadedImage,
              })
            } else {
              console.warn(`Failed to upload image: ${content.trim()}`)
            }
          } catch (error) {
            console.error(`Error uploading image ${content.trim()}:`, error)
          }
        }
        break
    }
  }

  return blocks.length > 0 ? blocks : undefined
}

async function createHotelDocument(record) {
  try {
    // Validate hotel fields
    record = validateHotelFields(record)

    // Transform edition from CSV
    const editionValue = transformEdition(record['Edition'])

    // Handle references first
    const categoryId = await createOrFindCategory(record['Hotel Kategorie'])
    const addressId = await createAddress(record)
    const achievementRefs = await createOrFindAchievements(record['Achievements'])

    // Handle brand image references
    const secondaryHeroBrandImages = createReferences(record['Secondary Hero Section/Brand Images'])
    const hotelDetailsBrandImages = createReferences(record['Hotel Details Section/Brand Images'])

    // Transform ranking category if present
    const rankingCategoryLabel = record['Ranking Einstellungen/Special Edition Kategorie']
    const rankingCategoryValue = transformRankingCategory(rankingCategoryLabel)

    // Create slug from hotel name
    const rawSlug =
      record['Slug'] ||
      record['Hotel Name']
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

    const slug = slugify(rawSlug)

    // Helper function to convert text to blockContent
    const toBlockContent = (text, style = 'normal') => {
      if (!text) return undefined

      // Create block content array (can have multiple blocks for different styles)
      const blocks = []

      // Split text into paragraphs (if any)
      const paragraphs = text.split('\n').filter(Boolean)

      // If no paragraphs, treat as single block
      if (paragraphs.length === 0) {
        paragraphs.push(text)
      }

      // Process each paragraph as a block
      for (const paragraph of paragraphs) {
        const block = {
          _type: 'block',
          style: style,
          _key: Math.random().toString(36).substring(2, 15),
          markDefs: [],
          children: [],
        }

        // Split by formatting markers while preserving them
        const parts = paragraph.match(/(\*\*[^*]+\*\*|\#[^#]+\#|[^*#]+)/g) || [paragraph]

        for (const part of parts) {
          // Check for bold text with color inside: **#text#**
          if (part.startsWith('**') && part.endsWith('**') && part.includes('#')) {
            const innerText = part.slice(2, -2).trim()
            if (innerText.startsWith('#') && innerText.endsWith('#')) {
              block.children.push({
                _type: 'span',
                text: innerText.slice(1, -1),
                marks: ['strong', 'coloredText'],
              })
            }
          }
          // Check for colored text with bold inside: #**text**#
          else if (part.startsWith('#') && part.endsWith('#') && part.includes('**')) {
            const innerText = part.slice(1, -1).trim()
            if (innerText.startsWith('**') && innerText.endsWith('**')) {
              block.children.push({
                _type: 'span',
                text: innerText.slice(2, -2),
                marks: ['strong', 'coloredText'],
              })
            }
          }
          // Check for bold text: **text**
          else if (part.startsWith('**') && part.endsWith('**')) {
            block.children.push({
              _type: 'span',
              text: part.slice(2, -2),
              marks: ['strong'],
            })
          }
          // Check for colored text: #text#
          else if (part.startsWith('#') && part.endsWith('#')) {
            block.children.push({
              _type: 'span',
              text: part.slice(1, -1),
              marks: ['coloredText'],
            })
          }
          // Regular text
          else if (part.trim()) {
            block.children.push({
              _type: 'span',
              text: part,
              marks: [],
            })
          }
        }

        blocks.push(block)
      }

      return blocks
    }

    // Update body field to await the async function
    const bodyContent = record['Body']
      ? await toBlockContentWithComponents(record['Body'])
      : undefined

    // Prepare the hotel document
    const hotelDoc = {
      _type: 'hotel',
      language: importConfig.language,
      edition: editionValue,
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
        category: rankingCategoryValue,
      },

      // Body field with components
      body: bodyContent,

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
            brandImages: secondaryHeroBrandImages,
          }
        : undefined,

      // Hotel Details Section
      hotelDetailsSection: record['Hotel Details Section/Hotel Image']
        ? {
            image: await uploadImageFromPath(record['Hotel Details Section/Hotel Image']),
            description: record['Hotel Details Section/Description'],
            brandImages: hotelDetailsBrandImages,
          }
        : undefined,

      // About Hotel Section (New)
      aboutHotel: record['About Hotel/About Hotels/Image']
        ? {
            aboutHotels: await Promise.all(
              record['About Hotel/About Hotels/Image']
                .split('|')
                .map(async (image, index) => {
                  const descriptions =
                    record['About Hotel/About Hotels/Description']?.split('|') || []
                  const positions =
                    record['About Hotel/About Hotels/Image Position']?.split('|') || []

                  // Get values for this index
                  const imageValue = image.trim()
                  const descriptionValue = descriptions[index]?.trim()
                  const positionValue = positions[index]?.trim()

                  // Only create entry if at least one field has a value
                  if (!imageValue && !descriptionValue && !positionValue) {
                    return null
                  }

                  return {
                    image: imageValue ? await uploadImageFromPath(imageValue) : undefined,
                    description: descriptionValue
                      ? toBlockContent(descriptionValue, 'h2')
                      : undefined,
                    imagePosition: positionValue || 'left',
                  }
                })
                .filter(Boolean),
            ),
          }
        : undefined,

      // Hotel Info Section (New)
      hotelInfo: record['Hotel Info Section/Image']
        ? {
            image: await uploadImageFromPath(record['Hotel Info Section/Image']),
            title: record['Hotel Info Section/Popup Title'],
            description: toBlockContent(record['Hotel Info Section/Description']),
          }
        : undefined,

      // Hotel Info Premium Section
      hotelInfoPremium: {
        Person: {
          name: record['Hotel Info Section (Premium)/Person/Person Name'] || '',
          host: record['Hotel Info Section (Premium)/Person/Person Host'] || '',
          role: record['Hotel Info Section (Premium)/Person/Person Role'] || '',
          image: record['Hotel Info Section (Premium)/Person/Person Image']
            ? await uploadImageFromPath(record['Hotel Info Section (Premium)/Person/Person Image'])
            : undefined,
        },
        title: record['Hotel Info Section (Premium)/Popup Title'] || '',
        description: toBlockContent(record['Hotel Info Section (Premium)/Description']) || [],
      },
      // Testimonials Section (New)
      testimonials: record['Testimonials/Testimonial/Review']
        ? {
            testimonial: [
              {
                review: record['Testimonials/Testimonial/Review'],
                author: record['Testimonials/Testimonial/Author'],
              },
            ],
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
              ? (() => {
                  const questions =
                    record['Interview Section/Questions & Answers (EXCLUSIVE)/Question'].split('|')
                  const answers =
                    record['Interview Section/Questions & Answers (EXCLUSIVE)/Answer']?.split(
                      '|',
                    ) || []

                  return questions
                    .map((question, index) => {
                      const questionValue = question.trim()
                      const answerValue = answers[index]?.trim()

                      // Only create entry if either question or answer exists
                      if (!questionValue && !answerValue) return null

                      return {
                        question: questionValue || '',
                        answer: answerValue || '',
                      }
                    })
                    .filter(Boolean)
                })()
              : undefined,
            grandQuestions: record['Interview Section/Questions & Answers (GRAND)/Question']
              ? (() => {
                  const questions =
                    record['Interview Section/Questions & Answers (GRAND)/Question'].split('|')
                  const answers =
                    record['Interview Section/Questions & Answers (GRAND)/Answer']?.split('|') || []

                  return questions
                    .map((question, index) => {
                      const questionValue = question.trim()
                      const answerValue = answers[index]?.trim()

                      // Only create entry if either question or answer exists
                      if (!questionValue && !answerValue) return null

                      return {
                        question: questionValue || '',
                        answer: answerValue || '',
                      }
                    })
                    .filter(Boolean)
                })()
              : undefined,
          }
        : undefined,

      // Full Width Image (New)
      fullwidthImage: record['fullwidthImage']
        ? await uploadImageFromPath(record['fullwidthImage'])
        : undefined,

      // Map Section
      mapSection: {
        headline: record['Map Section/Headline'] || 'Hier werden Sie sein',
        contactInfo: {
          phone: record['MapSection/Hotel Contact Information/Phone Number'],
          email: record['MapSection/Hotel Contact Information/Email Address'],
          website: record['MapSection/Hotel Contact Information/Website URL'],
        },
      },

      // Adds Section (using reference ID from CSV)
      adds: record['Adds Section/Adds']
        ? {
            _type: 'object',
            add: {
              _type: 'reference',
              _ref: record['Adds Section/Adds'],
            },
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
    // Check if we should delete existing hotels
    if (importConfig.flushOldHotels) {
      await deleteExistingHotels()
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8')
    console.log('Reading CSV file...')

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      rtrim: true,
      ltrim: true,
      relax_column_count: true,
      quote: '"',
      escape: '"',
      relaxColumnCount: true,
      relaxQuotes: true,
      skipEmptyLines: true,
      delimiter: ',',
      bom: true,
      fromLine: 1,
      encoding: 'utf-8', // Explicitly set UTF-8 encoding for special characters
    })

    // Debug: Log the first record to see exact data
    console.log('First record raw data:', records[0])

    const testRecords = importConfig.limit ? records.slice(0, importConfig.limit) : records
    console.log(
      `Found ${testRecords.length} hotels to import${importConfig.limit ? ' (limited by config)' : ''}.`,
    )

    // Debug log for first record
    console.log('First record address fields:', {
      street: testRecords[0]['Hotel Adresse/Street and Number/Street'],
      number: testRecords[0]['Hotel Adresse/Street and Number/Number'],
      postal: testRecords[0]['Hotel Adresse/Postal Code and City/Postal Code'],
      city: testRecords[0]['Hotel Adresse/Postal Code and City/City'],
      country: testRecords[0]['Hotel Adresse/Country'],
    })

    for (const [i, record] of testRecords.entries()) {
      try {
        console.log(`[${i + 1}/${testRecords.length}] Processing: ${record['Hotel Name']}`)

        // Log raw record data for debugging
        console.log('Raw record data:', {
          name: record['Hotel Name'],
          street: record['Hotel Adresse/Street and Number/Street'],
          number: record['Hotel Adresse/Street and Number/Number'],
          postal: record['Hotel Adresse/Postal Code and City/Postal Code'],
          city: record['Hotel Adresse/Postal Code and City/City'],
          country: record['Hotel Adresse/Country'],
        })

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
    // Log more details about the error
    if (error.code === 'CSV_QUOTE_NOT_CLOSED') {
      console.error('CSV parsing details:', {
        line: error.lines,
        column: error.column,
        index: error.index,
        raw: error.raw,
      })
    }
  }
}

// Run the import
const csvFile = path.join(__dirname, importConfig.csvPath)
importHotels(csvFile)
