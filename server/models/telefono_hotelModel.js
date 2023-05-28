import { db } from "../database/db";
import {DataTypes} from "sequelize";

const telefono_hotel = db.define('telefono_hotel',{
    id_Hotel:{type: DataTypes.NUMBER, primaryKey: true},
    telefono:{type: DataTypes.STRING, primaryKey: true},
},{timestamps:false});

export default telefono_hotel;