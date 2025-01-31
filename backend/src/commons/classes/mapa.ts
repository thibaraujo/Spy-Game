import { CommonFields, ICommonFields } from "./commonFields";

export class Mapa extends CommonFields {
  nome: string;
  descricao: string;
  profissoes: string[];

  constructor(mapa: IMapa) {
    super(mapa);
    this.nome = mapa.nome;
    this.descricao = mapa.descricao;
    this.profissoes = mapa.profissoes;
  }
}

export interface IMapa extends ICommonFields {
  nome: string;
  descricao: string;
  profissoes: string[];
}
