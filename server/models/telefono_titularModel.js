import { db } from "../database/db";
import {DataTypes} from "sequelize";

const telefono_titular = db.define('telefono_titular',{
    id_Titular:{type: DataTypes.NUMBER, primaryKey: true},
    telefono:{type: DataTypes.STRING, primaryKey: true},
},{timestamps:false});

export default telefono_titular;