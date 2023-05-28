import { db } from "../database/db";
import {DataTypes} from "sequelize";

const agencia = db.define('agencia',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{timestamps:false});

export default agencia;