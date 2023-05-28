import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const ciudad = db.define('ciudad',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{
    timestamps:false,
    tableName: 'ciudad'
});

export default ciudad;