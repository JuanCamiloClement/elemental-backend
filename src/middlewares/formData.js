const busboy = require('busboy');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formData = (req, _, next) => {
  let uploadingFile = false;
  let countFiles = 0;

  const bb = busboy({ headers: req.headers });
  req.body = {};

  bb.on('field', (key, val) => {
    req.body[key] = val;
  });

  const done = () => {
    if (uploadingFile) return;
    if (countFiles > 0) return;

    next();
  };

  bb.on('file', (key, stream) => {
    uploadingFile = true;
    countFiles++;
    const cloud = cloudinary.uploader.upload_stream(
      { upload_preset: 'elemental' },
      (err, res) => {
        if (err) console.log(err) // throw new Error('Something went wrong uploading to Cloudinary');

        req.body[key] = res?.secure_url;

        uploadingFile = false;
        countFiles--;

        done();
      }
    );

    stream.on('data', (data) => {
      cloud.write(data);
    });

    stream.on('end', () => {
      cloud.end();
    });

  });

  bb.on('finish', () => {
    done();
  });

  req.pipe(bb);
};

module.exports = { formData }