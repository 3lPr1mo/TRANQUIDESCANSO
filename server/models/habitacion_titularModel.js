import { db } from "../database/db";
import {DataTypes} from "sequelize";

const habitaciontitular = db.define('habitaciontitular',{
    id_Titular:{type: DataTypes.NUMBER, primaryKey: true},
    id_Habitacion:{type: DataTypes.STRING, primaryKey: true},
},{timestamps:false});

export default habitaciontitular;