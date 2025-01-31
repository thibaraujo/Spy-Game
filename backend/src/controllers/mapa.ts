"use strict";

import {MapaModel} from "../models/mapa";
import { NextFunction, Request, Response } from "express";
import { Mapa } from "../commons/classes/mapa";
import { CustomError } from "../services/errorHandler";

export const MapaController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const mapa: Mapa = new Mapa({...req.body});
      const created = (await MapaModel.create(mapa)).toObject();
      return res.status(201).send(created);
    } catch (error: Error | any) {
      console.error("ERRO CRIANDO CONFIGURAÇÃO: ", error);
      return next(error);
    }
  },

  async import(req: Request, res: Response, next: NextFunction) {
    try {
      for(const item of req.body) {
        const mapa: Mapa = new Mapa({...item});
        if(await MapaModel.findOne({"status.deletedAt": null, nome: mapa.nome})) continue;
        await MapaModel.create(mapa);
      }
      return res.status(201).send("Importação concluída com sucesso.");
    } catch (error: Error | any) {
      console.error("ERRO IMPORTANDO MAPAS: ", error);
      return next(error);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      //* Recebe os filtros de busca e paginação
      let { page = 1, pageSize = 10 } = req.query;
      const { search } = req.query;

      //* Cria o objeto de busca
      const query: any = {
        "status.deletedAt": null,
      };
      if(search){
        query.$or = [
          {email: {$regex: search, $options: "i" }},
          {firstName: {$regex: search, $options: "i" }},
          {lastName: {$regex: search, $options: "i" }}
        ];
      }
      //* Converte a páginação para números e calcula o offset para a paginação
      page = parseInt(page as string);
      pageSize = parseInt(pageSize as string);
      const skip = (page - 1) * pageSize;

      //* Busca os mapas no BD, utilizando os filtros e ordenando por data de criação
      const mapas = (await MapaModel.find(query).skip(skip).limit(pageSize).sort({_id: -1}).exec());

      //* Retorna a lista de mapas
      return res.status(200).send({results: mapas, total: await MapaModel.countDocuments(query)});
    } catch (error) {
      console.error("ERRO LISTANDO MAPAS: ", error);
      return next(error);
    }
  },

  async index(req: Request, res: Response, next: NextFunction) {
    const mapaId = req.query.id;
    try {
      console.log("BUSCANDO MAPA COM ID: " + mapaId);

      // Busca o mapa com o id solicitado
      let mapa = (await MapaModel.findById(mapaId).lean().exec());
      if(!mapa) return next(new CustomError('Mapa não encontrado.', 404, 'Mapa não encontrado.'));
      console.log("MAPA: " + JSON.stringify(mapa));

      // Resposta
      return res.status(200).set("Content-Type", "application/json").send(mapa);
    } catch (error) {
      console.error("ERRO BUSCANDO MAPA: ", error);
      return next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {

    const mapaId = req.query.id;
    delete req.body._id;
    const mapa = req.body;

    try {
      // Realiza a atualização
      const updated = (await MapaModel.findByIdAndUpdate(mapaId, { $set: {...mapa, "status.updatedAt": new Date()} }, { new: true}).exec());
      if(!updated) return next(new CustomError('Mapa não encontrado.', 409, 'Mapa não encontrado.'));

      // Debug
      console.log("EDITANDO MAPA COM ID: " + mapaId);
      console.log("MAPA EDITADO: " + JSON.stringify(updated));

      // Resposta
      return res.status(200).set("Content-Type", "application/json").send(updated);
    } catch (error) {
      console.error("ERRO EDITANDO MAPA: ", error);
      return next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const mapaId = req.query.id;
    try {
      const resp = (await MapaModel.findByIdAndUpdate(mapaId, {"status.deletedAt": new Date()}).exec());
      if(!resp) return next(new CustomError('Mapa não encontrado.', 409, 'Mapa não encontrado.'));

      // Debug
      console.log("DESABILITANDO MAPA COM ID: " + mapaId);

      // Resposta
      return res.status(200).set("Content-Type", "application/json").send(mapaId);
    } catch (error) {
      console.error("ERRO DESABILITANDO MAPA: ", error);
      return next(error);
    }
  },

  async activate(req: Request, res: Response, next: NextFunction) {

    const mapaId = req.query.id;

    try {
      // Realiza a atualização
      const updatedMapa = (await MapaModel.findByIdAndUpdate(mapaId, { $set: {"status.deletedAt": null} }, { new: true}).exec());
      if(!updatedMapa) return next(new CustomError('Mapa não encontrado.', 409, 'Mapa não encontrado.'));

      // Debug
      console.log("ATIVANDO MAPA COM ID: " + mapaId);
      console.log("MAPA ATIVANDO: " + JSON.stringify(updatedMapa));

      // Resposta
      return res.status(200).set("Content-Type", "application/json").send(updatedMapa);
    } catch (error) {
      console.error("ERRO ATIVANDO MAPA: ", error);
      return next(error);
    }
  },
};
