const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./users-model.js');

router.get('/', protected, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// function auth(req, res, next) {
//   const {username, password} = req.headers;
//   Users.findBy({ username })
//   .first()
//   .then(user => {
//     if (user && bcrypt.compareSync(password, user.password)) {
//       console.log("success!")
//       next() 
//     } else {
//         res.status(401).json({ message: "Invalid credentials" })
//       }
//   })
//   .catch(err => {
//     res.status(500).json(err)
//   })
// }

function protected(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'you shall not pass!!' });
  }
}

module.exports = router;
