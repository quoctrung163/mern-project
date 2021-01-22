import express from 'express';
import { create, list, read, remove, update, userByID } from '../controllers/user.controller';
import { hasAuthorization, requireSignin, signin, signout } from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users')
  .get(list)
  .post(create);

router.route('/api/users/:userId')
  .get(requireSignin, read)
  .put(requireSignin, hasAuthorization, update)
  .delete(requireSignin, hasAuthorization, remove);

router.param('userId', userByID);

export default router;