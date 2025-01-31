import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersAvatarController from '@modules/users/infra/http/controllers/UsersAvatarController';

import ensureAuthenticated from '../middlewares/ensureAutheticated';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();


usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update);

export default usersRouter;
