import { db } from "../database/db";
import {DataTypes} from "sequelize";

const servicio = db.define('servicio',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
    valor:{type: DataTypes.REAL},
},{timestamps:false});

export default servicio;