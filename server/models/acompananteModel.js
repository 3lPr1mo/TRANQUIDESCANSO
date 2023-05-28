import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const acompanante = db.define('acompanante',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
    edad:{type: DataTypes.NUMBER},
    id_Titular:{type: DataTypes.NUMBER},
    mascota:{type: DataTypes.NUMBER},
},{
    timestamps:false,
    tableName: 'acompanante'
});

export default acompanante;