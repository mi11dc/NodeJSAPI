const express = require("express");
const pageRouter = express.Router();

const firebaseJs = require("./firebase");
const hydraAI = require("./hydra-ai");
const general = require("./general");

const upload = general.multerFileStorage();

pageRouter.get("/", async (request, response) => {
    const photosData = await firebaseJs.getAllPhotos();
    console.log(photosData);
    response.render("index", { photos: photosData });
});

pageRouter.post("/uploadImage", upload.single('file'), async (request, response) => {
    var file = request.file;
    var b64file = general.base64_encode(file.destination + file.filename);

    await hydraAI.checkFaceImage(b64file)
        .then(async (res) => {

            if (res.body && res.body.success) {
                var photoObj = {
                    name: file.filename,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    b64String: "data:image/jpg; base64, " + b64file,
                    faceInfo: res.body.detected_faces[0].info || defaultInfo
                }
                await addPhoto(photoObj, response);
            } else {
                console.log('Error: ' + res.message);
            }
        })
        .catch((error) => {
            console.log('Error:', error);
        });
});

async function addPhoto(photoObj, response) {
    await firebaseJs.addPhoto(photoObj)
        .then(async (res) => {
            const photosData = await firebaseJs.getAllPhotos();
            response.render("index", { photos: photosData });
        })
        .catch((error) => {
            console.log('Error:', error);
        });
}

module.exports = pageRouter;

