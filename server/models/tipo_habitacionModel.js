import { db } from "../database/db";
import {DataTypes} from "sequelize";

const tipo_habitacion = db.define('tipo_habitacion',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{timestamps:false});

export default tipo_habitacion;