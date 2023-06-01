import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const habitacion = db.define('habitacion',{
    id:{type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true},
    id_tipohabitacion:{type: DataTypes.NUMBER},
    reservada:{type: DataTypes.NUMBER},
},{
    timestamps:false,
    tableName: 'habitacion'
});

export default habitacion;