module.exports.importConfig = {
  language: 'de', // Set the language for all hotels
  edition: 'deutschland', // Set the edition for all hotels
  limit: null, // Number of entries to import (set to null for all)
  csvPath: '../hotels.csv', // Path to the new CSV file
  imagesPath: '../../hotels images', // Base path for images directory
  flushOldHotels: true,
}
