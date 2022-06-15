const _ = require('lodash');
const { BadRequest } = require('../errors');
const { User, validateUser } = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new BadRequest('Invalid email or password');

  const isValid = await user.verifyPassword(password);
  if (!isValid) throw new BadRequest('Invalid email or password');

  const token = user.generateToken();

  res
    .header('x-auth-token', token)
    .status(200)
    .send(
      _.pick(user, [
        '_id',
        'firstname',
        'lastname',
        'coverImage',
        'email',
        'sex',
        'profileImage',
        'photos',
      ])
    );
};

const register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) throw new BadRequest(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) throw new BadRequest('User already register');

  const createdUser = await User.create(req.body);

  const token = createdUser.generateToken();
  res
    .header('x-auth-token', token)
    .status(201)
    .send(
      _.pick(createdUser, [
        '_id',
        'firstname',
        'lastname',
        'coverImage',
        'email',
        'sex',
        'profileImage',
        'photos',
      ])
    );
};

module.exports = {
  login,
  register,
};
