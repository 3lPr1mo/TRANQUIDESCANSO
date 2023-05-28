import { db } from "../database/db";
import {DataTypes} from "sequelize";

const ciudad = db.define('ciudad',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
},{timestamps:false});

export default ciudad;