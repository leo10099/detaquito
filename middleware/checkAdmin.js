module.exports = (req, res, next) => {
  if (req.user === undefined) {
    res.send('No autorizado');
    return false;
  }
  if (req.user.role !== 'admin') {
    res.send('Sólo los administradores pueden acceder a este recurso');
    return false;
  }

  return next();
};
