import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const tipo_habitacion = db.define('tipo_habitacion',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{
    timestamps:false,
    tableName: 'tipo_habitacion'
});

export default tipo_habitacion;