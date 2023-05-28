import { db } from "../database/db";
import {DataTypes} from "sequelize";

const titular = db.define('titular',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
    direccion:{type: DataTypes.STRING},
    id_Agencia:{type: DataTypes.NUMBER},
},{timestamps:false});

export default titular;