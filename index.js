const express = require('express')
const AWS = require('aws-sdk');
const app = express()
const s3 = new AWS.S3();
const port = 3000;

app.get('/', async (_, res) => {
  try {

    const myFile = await getFile();

    res.status(200)
      .send(Buffer.from(myFile.Body).toString('base64'));

  } catch (err) {

    return res.status(500).send(err);
  }
});

app.get('/:file', async (req, res) => {
  try {
    const { file } = req.params;
    const myFile = await getSpecificFile(file);

    res.status(200)
      .send(Buffer.from(myFile.Body).toString('base64'));

  } catch (err) {

    return res.status(404).send(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

function getFile() {
  const params = {
    Bucket: "source-buckket",
    Key: "bot.png"
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) return reject(err); // an error occurred
      else resolve(data);           // successful response
    });

  });
}

function getSpecificFile(file) {

  const params = {
    Bucket: "source-buckket",
    Key: file
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) return reject(err); // an error occurred
      else resolve(data);           // successful response
    });

  });
}
