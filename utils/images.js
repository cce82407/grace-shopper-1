const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAJI46TS2NWBWOKYWQ",
  secretAccessKey: "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"
});

let s3 = new AWS.S3();

async function getImage() {
  const data = await s3.getObject(
    {
      Bucket: 'rebel-alliance-graces-hopper',
      Key: 'Yamaha_Flugelhorn_YFH-8310Z.jpg'
    }

  ).promise();
  return data;
}

const myImage = () => {
  getImage()
    .then((img) => {
      let image = "<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
      return image
    })

  function encode(data) {
    let buf = Buffer.from(data);
    let base64 = buf.toString('base64');
    return base64
  }
}

export default myImage

