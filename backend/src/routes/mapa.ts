"use strict";
import { NextFunction, Request, Response, Router } from "express";
import {MapaController} from "../controllers/mapa";
import validator from "../validators/mapa";
import { celebrateErrorHandler } from "../services/errorHandler";


const router = Router();
const URL = "/mapas";

// Cadastro de mapas
router.post(URL, [validator.post(), celebrateErrorHandler], MapaController.create);

// Importação de mapas
router.post(URL + "/import", [validator.import(), celebrateErrorHandler], MapaController.import);

// Atualização de mapas
router.put(URL, [validator.put(), celebrateErrorHandler], MapaController.update);

// Leitura de mapas
router.get(URL, [validator.get(), celebrateErrorHandler], (req: Request, res: Response, next: NextFunction) => {
  if(req.query.id) return MapaController.index(req, res, next);
  return MapaController.list(req, res, next);
});

// Soft Delete de mapas
router.delete(URL, [validator.delete(), celebrateErrorHandler], MapaController.delete);

// Activate de mapas
router.put(URL + "/activate", [validator.activate(), celebrateErrorHandler], MapaController.activate);



export default router;
