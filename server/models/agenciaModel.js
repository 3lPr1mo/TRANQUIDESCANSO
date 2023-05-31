import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const agencia = db.define('agencia',{
    id:{type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true},
    nombre:{type: DataTypes.STRING},
},{
    timestamps:false,
    tableName: 'agencia'
});

export default agencia;