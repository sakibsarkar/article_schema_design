import express from "express";
import { arcticleRoute } from "./article.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/article",
    route: arcticleRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
