import { db } from "../database/db";
import {DataTypes} from "sequelize";

const usuario = db.define('ciudad',{
    usuario:{type: DataTypes.STRING, primaryKey: true},
    contrasena:{type: DataTypes.STRING},
},{timestamps:false});

export default usuario;