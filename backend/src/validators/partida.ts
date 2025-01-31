"use strict";
import { celebrate, Joi, Segments } from "celebrate";
import { customMessages } from "../services/errorHandler";

export default {
  // CRUD
  post() {
    return celebrate({
      [Segments.BODY]: {
        jogadores: Joi.array().items(Joi.string()).required(),
      }
    });
  },
};
