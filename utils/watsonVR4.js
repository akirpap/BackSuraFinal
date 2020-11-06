const fs = require("fs");

const VisualRecognitionV4 = require("ibm-watson/visual-recognition/v4");
const { IamAuthenticator } = require("ibm-watson/auth");

function callVisualRecognitionV4(args, zipName) {
    return new Promise(function(resolve, reject) {
        if (zipName !== null) {
            console.log("Analyzing objects!");

            const visualRecognition = new VisualRecognitionV4({
                version: args.vr_version,
                authenticator: new IamAuthenticator({
                    apikey: args.vr_api_key
                }),
                url: args.vr_url
            });

            const params = {
                imagesFile: fs.createReadStream("./" + zipName),
                collectionIds: ["5894cc91-3fbe-4e33-bb4b-64994746f3e7"], // 5826c5ec-6f86-44b1-ab2b-cca6c75f2fc7
                features: ["objects"],
                threshold: 0.17
            };

            visualRecognition
                .analyze(params)
                .then(response => {
                    // console.log(JSON.stringify(response.result, null, 2));
                    resolve(response.result);
                })
                .catch(err => {
                    console.log("error: ", err);
                    reject(err);
                });
        } else {
            console.log("Null zip");
        }
    });
}
module.exports = callVisualRecognitionV4;