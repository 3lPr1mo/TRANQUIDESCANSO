import { db } from "../database/db";
import {DataTypes} from "sequelize";

const pago_reserva = db.define('pago_reserva',{
    id_Reserva:{type: DataTypes.NUMBER, primaryKey: true},
    id_Pago:{type: DataTypes.NUMBER,primaryKey: true},
    total_pagado:{type: DataTypes.REAL},
},{timestamps:false});

export default pago_reserva;