import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const habitacion_titular = db.define('habitacion_titular',{
    id_Titular:{type: DataTypes.NUMBER, primaryKey: true},
    id_Habitacion:{type: DataTypes.STRING, primaryKey: true},
},{
    timestamps:false,
    tableName: 'habitaciontitular'
});

export default habitacion_titular;