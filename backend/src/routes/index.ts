"use strict";
import { Router } from "express";

const router = Router();

import mapaRouter from "./mapa";
router.use(mapaRouter);

import partidaRouter from "./partida";
router.use(partidaRouter);


export default router;

