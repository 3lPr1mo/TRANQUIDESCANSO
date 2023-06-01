import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const servicio = db.define('servicio',{
    id:{type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true},
    nombre:{type: DataTypes.STRING},
    valor:{type: DataTypes.REAL},
},{
    timestamps:false,
    tableName: 'servicio'
});

export default servicio;