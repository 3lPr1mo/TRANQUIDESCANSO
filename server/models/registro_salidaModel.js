import { db } from "../database/db";
import {DataTypes} from "sequelize";

const registro_salida = db.define('registro_salida',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    fecha:{type: DataTypes.DATE},
    hora:{type: DataTypes.TIME},
},{timestamps:false});

export default registro_salida;