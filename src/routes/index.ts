import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';


const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
// faz com todas as rotas que se iniciem
// com /appointments, seja passado, o que vem depois de /appointments, para dentro de
// appointmentsRouter

export default routes;
