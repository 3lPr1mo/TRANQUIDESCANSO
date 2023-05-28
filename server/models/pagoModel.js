import { db } from "../database/db";
import {DataTypes} from "sequelize";

const pago = db.define('pago',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    fecha_pago:{type: DataTypes.DATE},
    valor:{type: DataTypes.REAL},
},{timestamps:false});

export default pago;