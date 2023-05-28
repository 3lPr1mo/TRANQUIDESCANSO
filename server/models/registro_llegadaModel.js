import { db } from "../database/db";
import {DataTypes} from "sequelize";

const registro_llegada = db.define('registro_llegada',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    fecha:{type: DataTypes.DATE},
    hora:{type: DataTypes.TIME},
},{timestamps:false});

export default registro_llegada;