// Import the functions you need from the SDKs you need
const admin = require('firebase-admin');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const serviceAccount = require("../nodejs-a5d26-firebase-adminsdk-a6htc-cc4ad76196.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
});

const database = admin.database();
const ref =  database.ref('photos');

async function addPhoto(photoObj) { 
    ref.push(photoObj)
        .then(() => {
        })
        .catch((error) => {
            alert('Error adding data to the database:', error);
        });
}

async function getAllPhotos() {
    const array = [];
    const photos = await ref.get();
    
    photos.forEach((photo) => {
        array.push({ ...photo.val(), _id: photo.id });
    });

    return array;
}

module.exports = {
    addPhoto,
    getAllPhotos
};