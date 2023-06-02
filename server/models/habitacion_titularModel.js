import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const habitacion_titular = db.define('habitacion_titular',{
    id_titular:{type: DataTypes.NUMBER, primaryKey: true},
    id_habitacion:{type: DataTypes.STRING, primaryKey: true},
},{
    timestamps:false,
    tableName: 'habitacion_titular'
});

export default habitacion_titular;