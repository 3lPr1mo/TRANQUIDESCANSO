import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const pago_reserva = db.define('pago_reserva',{
    id_reserva:{type: DataTypes.NUMBER, primaryKey: true},
    id_pago:{type: DataTypes.NUMBER,primaryKey: true},
    total_pagado:{type: DataTypes.REAL},
},{
    timestamps:false,
    tableName: 'pago_reserva'
});

export default pago_reserva;