import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const pago = db.define('pago',{
    id:{type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true},
    fecha_pago:{type: DataTypes.DATE},
    valor:{type: DataTypes.REAL},
},{
    timestamps:false,
    tableName: 'pago'
});

export default pago;