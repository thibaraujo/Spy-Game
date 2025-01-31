"use strict";
import { Router } from "express";
import {PartidaController} from "../controllers/partida";
import validator from "../validators/partida";
import { celebrateErrorHandler } from "../services/errorHandler";


const router = Router();
const URL = "/partidas";

// Cadastro de partidas
router.post(URL, [validator.post(), celebrateErrorHandler], PartidaController.create);


export default router;
