exports.uploadAvatar = async (file, userId) => {
  const cloudinary = require('cloudinary');

  cloudinary.config({
    cloud_name: 'detaquito',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  return new Promise(function(resolve, reject) {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id: `avatar/${userId}`,
        gravity: 'face',
        width: 150,
        height: 150,
        crop: 'thumb',
        radius: 75
      },
      function(error, result) {
        if (error) {
          reject(error.message);
        }
        resolve(result);
      }
    );
  });
};
