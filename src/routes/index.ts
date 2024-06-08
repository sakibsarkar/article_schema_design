import express from "express";
import { arcticleRoute } from "./article.route";
import { peopleRotue as peopleRoute } from "./people.route";
const router = express.Router();

const moduleRoute = [
  {
    path: "/article",
    route: arcticleRoute,
  },
  {
    path: "/people",
    route: peopleRoute,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
