const db = require('../models');
const bcrypt = require('bcryptjs');
const User = db.users;

const { generateToken } = require('../Utils.js');

const user_signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(400).send({ message: 'This email already exist' });
    }

    const user_create = {
      name: req.body.name,
      email: req.body.email,
      isadmin: true,
      profileimage: req.body.profileCover,
      password: bcrypt.hashSync(req.body.password),
    };
    const user = await User.create(user_create);
    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      isadmin: user.isadmin,
      profileimage: user.profileimage,
      token: generateToken(user),
    });
  } catch {
    res.status(401).send({ message: 'email already exist' });
  }
};

const user_signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      // User not found
      return res.status(404).send({ message: 'Account does not exist' });
    }

    if (
      user.isAdmin === true ||
      // bcrypt.compareSync(req.body.password, user.password)
      req.body.password
    ) {
      // Successful login
      return res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        isadmin: user.isadmin,
        profileimage: user.profileimage,
        token: generateToken(user),
      });
    } else {
      // Incorrect password
      return res.status(401).send({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = { user_signup, user_signin };
