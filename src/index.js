import swaggerUI from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import i18n from './controllers/i18n';
import router from './routes/index';
import swaggerDocs from './docs';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(i18n.init);
app.use(passport.session());
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(router);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server started at:...${port}`));

export default app;
