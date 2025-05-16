// @ts-nocheck
require('dotenv').config()
const {createClient} = require('@sanity/client')
const {parse} = require('csv-parse/sync')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const {importConfig} = require('./import-hotels.config')

// Load environment variables (if using dotenv, uncomment below)
// import dotenv from 'dotenv';
// dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  useCdn: false,
})

/**
 * @param {string} input
 * @returns {string}
 */
function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and')
    .replace(/[\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * @param {string} tagAwards
 * @returns {{name: string, _key: string}[]}
 */
function mapAchievements(tagAwards) {
  if (!tagAwards) return []
  return tagAwards
    .split(/\||,/)
    .map((item) => ({
      name: item.trim(),
      _key: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
    }))
    .filter((a) => a.name)
}

async function importHotels(csvPath) {
  const fileContent = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  })

  const testRecords = importConfig.limit ? records.slice(0, importConfig.limit) : records
  console.log(`Found ${testRecords.length} hotels in CSV (config mode).`)

  for (const [i, record] of testRecords.entries()) {
    try {
      /** @type {any} */
      const doc = {
        _type: 'hotel',
        language: importConfig.language,
        edition: importConfig.edition,
        name: record['hotelName'],
        city: record['city'],
        // country: record['country'],
        description: record['description'],
        category: record['category'],
        segment: record['segment'],
        hotelType: record['hotelType'] || 'classic',
        slug: {current: slugify(record['hotelName'] || '')},
        achievements: mapAchievements(record['tagAwards']),
      }
      // Only add ranking if placement is a positive number
      const placement = Number(record['placement'])
      if (placement > 0) {
        doc.ranking = {position: placement}
      }
      Object.keys(doc).forEach((k) => (doc[k] === undefined ? delete doc[k] : undefined))
      const created = await client.create(doc)
      console.log(
        `[${i + 1}/${testRecords.length}] Created hotel: ${doc.name} (ID: ${created._id})`,
      )
      await client.patch(created._id).set({}).commit({autoGenerateArrayKeys: true})
      await client.createOrReplace({...created, _id: created._id, _type: 'hotel'})
      console.log(`[${i + 1}/${testRecords.length}] Published hotel: ${doc.name}`)
    } catch (err) {
      console.error(
        `[${i + 1}/${testRecords.length}] Error processing hotel: ${record['hotelName']}`,
      )
      console.error(err)
    }
  }
  console.log('Import completed!')
}

// Run the import
const csvFile = path.join(__dirname, importConfig.csvPath)
importHotels(csvFile)
