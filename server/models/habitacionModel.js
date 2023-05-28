import { db } from "../database/db";
import {DataTypes} from "sequelize";

const habitacion = db.define('habitacion',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    id_TipoHabitacion:{type: DataTypes.NUMBER},
    reservada:{type: DataTypes.NUMBER},
},{timestamps:false});

export default habitacion;