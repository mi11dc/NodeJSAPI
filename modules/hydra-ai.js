const fetch = require("node-fetch");

const url = 'https://' + process.env.RAPID_API_HOST + '/dev/faces/analyse/';

function setOptions(base64Image) {
    return {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_CLIENT_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        },
        body: {
            image: base64Image
        }
    };
}

async function checkFaceImage(base64Image) {
    try {
        const response = await fetch(url, setOptions(base64Image));
        return await response.text();
    } catch (error) {
        console.log('Error:', error);
    }
}

module.exports = {
    checkFaceImage
};