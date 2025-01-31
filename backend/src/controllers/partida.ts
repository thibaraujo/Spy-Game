"use strict";

import { NextFunction, Request, Response } from "express";
import { IJogador, Partida } from "../commons/classes/partida";
import { CustomError } from "../services/errorHandler";
import mongoose from "mongoose";
import { MapaModel } from "../models/mapa";

async function sortearJogadores(jogadores: string[]) {
  try {
    
    let mapa: any = await MapaModel.aggregate([
      { $match: {"status.deletedAt": null}},
      { $sample: { size: 1} },
    ]);
    mapa = mapa[0];

    if(mapa && mapa.profissoes) {
      let sorteio: IJogador[] = [];
      let profissoes = mapa.profissoes;

      //* Garantindo que há um espião -> sorteio de índice e remoção
      const indiceEspiao = Math.floor(Math.random() * jogadores.length);
      sorteio.push({nome: jogadores[indiceEspiao], profissao: "ESPIÃO"});
      jogadores.splice(indiceEspiao, 1);

      //* Sorteio do restante das profissoes
      jogadores.map((jogador: string) => {
        sorteio.push({nome: jogador, profissao: profissoes[Math.floor(Math.random() * profissoes.length)]});
      });

      //* retornar sorteio ordenado com nome em ordem alfabética
      sorteio = sorteio.sort((a, b) => (a.nome > b.nome) ? 1 : -1);

      return {sucesso: true, sorteio: sorteio, mapa: mapa};
    } 
  } catch (error: Error | any) {
    return {sucesso: false, mensagem: "Falha ao sortear profissões", erro: error}
  }
 
}


export const PartidaController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if(!req.body.jogadores || req.body.jogadores <= 2) throw "Necessário informar pelo menos 3 jogadores."

      //* Identificação se há nomes iguais
      const jogadores = req.body.jogadores.map((jogador: string) => { return jogador.replace(/\s/g, '') });
      const setJogadores = new Set(jogadores);
      if(jogadores.length != setJogadores.size) throw "Não é permitido jogadores com mesmo nome.";

      //* atribuição de profissões aos usuários e determinação de espião
      const jogadoresAtribuidos = await sortearJogadores(req.body.jogadores);

      //* Criando objeto partida
      if(jogadoresAtribuidos?.sucesso == true && jogadoresAtribuidos.sorteio) {
        const partida: Partida = new Partida({
          mapa: jogadoresAtribuidos.mapa,
          jogadores: jogadoresAtribuidos.sorteio
        });

        return res.status(201).send(partida);
      } else throw "Erro criando partida:" + jogadoresAtribuidos?.mensagem;
      
    } catch (error: Error | any) {
      console.error("ERRO CRIANDO PARTIDA: ", error);
      return next(new CustomError(error, 404))
    }
  },
};
