import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersAvatarController from '@modules/users/infra/http/controllers/UsersAvatarController';

import ensureAuthenticated from '../middlewares/ensureAutheticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();


usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update);

export default usersRouter;
