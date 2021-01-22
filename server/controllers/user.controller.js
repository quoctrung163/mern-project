import User from '../models/user.model';
import _ from 'lodash';
import { getErrorMessage } from './../helpers/dbErrorHandler';

export const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err)
      })
    }
    res.status(200).json({
      message: 'Successfully signed up!'
    })
  })
}

// Load user and append to req
export const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  })
}

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

export const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err)
      });
    }
    res.json(users);
  }).select('Name email updated created')
}

export const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err)
      })
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  })
}

export const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: getErrorMessage(err)
      })
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  })
}