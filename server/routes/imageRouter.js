const { Router } = require('express');
const AWS = require('aws-sdk');

const imageRouter = Router()

imageRouter.get('/', (req, res) => {
  AWS.config.update({
    accessKeyId: "AKIAJI46TS2NWBWOKYWQ",
    secretAccessKey: "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"
  });
  const s3 = new AWS.S3();
  async function getImage() {
    const data = s3.getObject(
      {
        Bucket: 'rebel-alliance-graces-hopper',
        Key: 'Yamaha_Flugelhorn_YFH-8310Z.jpg'
      }

    ).promise();
    return data;
  }
  function encode(data) {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64
  }
  getImage()
    .then((img) => {
      const image = `<img src='data:image/jpeg;base64,${encode(img.Body)}'/>`;
      res.send(image)
    }).catch((e) => {
      res.send(e)
    })

})

module.exports = {
  url: '/image',
  router: imageRouter
}