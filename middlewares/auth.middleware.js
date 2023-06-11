const db = require('../db')

module.exports.requireAuth = function(req, res, next) {
  if (!req.signedCookie.userId) {
      res.redirect('/auth/login');
      return;
  } 
  const user = db.get('user').find({ id: req.signedCookie.userId}).value();

  if(!user){
      res.redirect('/auth/login');
      return;
  }
  res.locals.user = user;
  next();
}