import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const categoria_hotel = db.define('categoria_hotel',{
    id_hotel:{type: DataTypes.NUMBER, primaryKey: true},
    id_categoria:{type: DataTypes.NUMBER, primaryKey: true},
    fecha_cambio:{type: DataTypes.DATE},
},{
    timestamps:false,
    tableName: 'categoria_hotel'
});

export default categoria_hotel;