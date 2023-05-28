import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const usuario = db.define('usuario',{
    usuario:{type: DataTypes.STRING, primaryKey: true},
    contrasena:{type: DataTypes.STRING},
},{
    timestamps:false,
    tableName: 'usuario'
});

export default usuario;