const sharp = require('sharp');

// ...existing code...

async function compressImage(inputPath, outputPath, format = 'jpeg', quality = 80) {
    try {
        const transformer = sharp(inputPath).resize({ width: 1080 }); // Adjust width for responsive images

        if (format === 'jpeg') {
            transformer.jpeg({ quality });
        } else if (format === 'png') {
            transformer.png({ quality });
        }

        await transformer.toFile(outputPath);
    } catch (error) {
        console.error('Error compressing image:', error);
        throw error;
    }
}

// Export the function for use in the app
module.exports = { compressImage };
