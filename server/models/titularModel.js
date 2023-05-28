import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const titular = db.define('titular',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
    direccion:{type: DataTypes.STRING},
    id_Agencia:{type: DataTypes.NUMBER},
},{
    timestamps:false,
    tableName: 'titular'
});

export default titular;