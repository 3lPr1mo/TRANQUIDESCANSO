import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const telefono_titular = db.define('telefono_titular',{
    id_titular:{type: DataTypes.NUMBER, primaryKey: true},
    telefono:{type: DataTypes.STRING, primaryKey: true},
},{
    timestamps:false,
    tableName: 'telefono_titular'
});

export default telefono_titular;