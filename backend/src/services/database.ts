import mongoose from "mongoose";
import { commonFieldsPLugin } from "../plugins/commonFields";

interface IDatabaseConfig {
  user?: string;
  password?: string;
  databaseName?: string;
  host?: string;
}

export default {
  async connect(config?: IDatabaseConfig) {
    // DB settings
    const user = config?.user || process.env.DATABASE_USER;
    const password = config?.password || process.env.DATABASE_PASSWORD;
    const databaseName = config?.databaseName || process.env.DATABASE_NAME;
    const host = config?.host || process.env.DATABASE_HOST;

    console.log("Connecting to database " + databaseName + "...");
    const uri = `mongodb+srv://${user}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;
    try {
      await mongoose.connect(uri);
      console.log("Database successfully connected!");
    } catch (error) {
      console.error("Error connecting to database: ", error);
    }
  },

  disconnect() {
    return mongoose.disconnect();
  }

};

export function configureSchemas() {
  //* Iterar por todos os modelos
  mongoose.models && Object.values(mongoose.models).forEach((model) => {
    //* Aplicar o plugin de campos comuns
    model.schema.plugin(commonFieldsPLugin);

    //* Remover versionKey
    model.schema.set("versionKey", false);

    //* Iterar sobre os campos do schema
    model.schema.eachPath((field, schemaType) => {
      // //* Se o campo for unique, criar um índice único com a regra parcial de deleção
      if (schemaType.options.unique) {
        model.schema.index({ [field]: 1, "status.deletedAt": 1 }, { unique: true, partialFilterExpression: { "status.deletedAt": null } });
      } 
    });
  });
}
