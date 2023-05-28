import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const categoria = db.define('categoria',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    num_estrella:{type: DataTypes.STRING},
},{
    timestamps:false,
    tableName: 'categoria'
});

export default categoria;