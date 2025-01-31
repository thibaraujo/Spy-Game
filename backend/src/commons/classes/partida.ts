import mongoose from "mongoose";
import { CommonFields, ICommonFields } from "./commonFields";

export class Partida extends CommonFields {
  mapa: mongoose.Types.ObjectId | IPartida | Partida;
  jogadores: IJogador[];
 
  constructor(partida: IPartida) {
    super(partida);
    this.mapa = partida.mapa;
    this.jogadores = partida.jogadores;
  }
}

export interface IPartida extends ICommonFields {
  mapa: mongoose.Types.ObjectId | IPartida | Partida;
  jogadores: IJogador[];
}

export interface IJogador {
  nome: string;
  profissao: string;
}