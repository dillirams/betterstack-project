import { Router } from "express";
import { signup } from "../controller/signup.js";
import { signin } from "../controller/signin.js";
import { middleware } from "../middleware/middleware.js";
import { website } from "../controller/website.js";
import { websiteStatus } from "../controller/status.js";

export const appRouter=Router();

appRouter.post('/signup', signup);
appRouter.post('/signin', signin);
appRouter.post('/website', middleware, website ) 
appRouter.get('/status/:websiteId', middleware, websiteStatus)