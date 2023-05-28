import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const servicio_reserva = db.define('servicio_reserva',{
    id_Reserva:{type: DataTypes.NUMBER, primaryKey: true},
    id_Servicio:{type: DataTypes.NUMBER, primaryKey: true},
    total_costo:{type: DataTypes.REAL},
},{
    timestamps:false,
    tableName: 'servicio_reserva'
});

export default servicio_reserva;