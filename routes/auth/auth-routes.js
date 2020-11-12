const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');

// require the user model !!!!
const User = require('../../models/User.model');

//login
authRoutes.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      //if user with this username, vérifier que mot de passe ok
      if (bcrypt.compareSync(password, user.password) !== true) {
        return next(new Error('wrong password'));
      }
      //si oui afficher le user
      req.session.currentUser = user;
      res.json(user);
    })
    //if no user with this username
    .catch(next);
});

//signup
authRoutes.post('/signup', (req, res, next) => {
  const { username, password, campus, course } = req.body;

  //restriction de création de compte user
  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  if (password.length < 7) {
    res.status(400).json({
      message:
        'Please make your password at least 8 characters long for security purposes.',
    });
    return;
  }

  User.findOne({ username }) //syntaxe ({}
    .then((user) => {
      if (user) {
        res
          .status(400)
          .json({ message: 'Username taken. Choose another one.' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      User.create({
        username: username,
        password: hashPass,
        campus: campus,
        course: course,
      })
        .then((newUser) => res.status(200).json(newUser))
        .catch((err) => {
          res.status(400).json({ message: 'Username check went bad.' });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Username check went bad.' });
    });
});

//upload - plus tard

//edit

//logout

//loggedin

module.exports = authRoutes;
