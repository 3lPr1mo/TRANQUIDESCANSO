import { db } from "../database/db";
import {DataTypes} from "sequelize";

const categoria = db.define('categoria',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{timestamps:false});

export default categoria;