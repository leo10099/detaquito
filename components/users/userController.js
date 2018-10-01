const mongoose = require('mongoose');
const { uploadAvatar } = require('../../services/cloudinary');
const User = mongoose.model('User');

exports.editUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { alias: req.body.alias, fav_team: req.body.fav_team } },
      { new: true, runValidators: true, context: 'query' }
    );
  } catch (e) {
    res.status(400).json(e);
  }

  res.status(200).json({ data: 'Se modificaron tus datos correctamente' });
};

exports.editUserAvatar = async (req, res) => {
  if (req.file && !req.file.mimetype.startsWith('image/')) {
    throw Error('Sólo se permiten imágenes');
  }
  // Subir a Cloudinary
  const respuesta = await uploadAvatar(req.file.path, req.user._id, res);
  // Actualizar el perfil de usuario con la URL de la nueva imágen
  const newUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { avatar: respuesta.secure_url } },
    { new: true }
  );
  res.status(200).json({ newUser });
};
