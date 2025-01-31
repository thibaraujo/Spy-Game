import { Schema, model } from "mongoose";
import {IMapa} from "../commons/classes/mapa";

const MapaSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  descricao: {
    type: String,
    required: false,
  },
  profissoes: [{
    type: String,
    required: true,
  }],
});

export const MapaModel = model<IMapa>("Mapa", MapaSchema);
