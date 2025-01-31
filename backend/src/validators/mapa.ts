"use strict";
import { celebrate, Joi, Segments } from "celebrate";
import { customMessages } from "../services/errorHandler";

export default {
  // CRUD
  get() {
    return celebrate({
      [Segments.QUERY]: {
        id: Joi.string().length(24).hex().messages(customMessages),
        page: Joi.number().min(1).messages(customMessages),
        pageSize: Joi.number().min(1).messages(customMessages),
      }
    });
  },

  post() {
    return celebrate({
      [Segments.BODY]: {
        nome: Joi.string(),
        descricao: Joi.string(),
        profissoes: Joi.array(),
      }
    });
  },

  import() {
    return celebrate({
      [Segments.BODY]: Joi.array().items({
        nome: Joi.string(),
        descricao: Joi.string(),
        profissoes: Joi.array(),
      })
    });
  },

  put() {
    return celebrate({
      [Segments.QUERY]: {
       id: Joi.string().length(24).hex()
      },
      [Segments.BODY]: {
        nome: Joi.string(),
        descricao: Joi.string(),
        profissoes: Joi.array(),
      }
    });
  },

  delete() {
    return celebrate({
      [Segments.QUERY]: {
       id: Joi.string().length(24).hex()
      }
    });
  },

  activate() {
    return celebrate({
      [Segments.QUERY]: {
       id: Joi.string().length(24).hex()
      }
    });
  },
};
