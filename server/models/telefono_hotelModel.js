import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const telefono_hotel = db.define('telefono_hotel',{
    id_Hotel:{type: DataTypes.NUMBER, primaryKey: true},
    telefono:{type: DataTypes.STRING, primaryKey: true},
},{
    timestamps:false,
    tableName: 'telefono_hotel'
});

export default telefono_hotel;