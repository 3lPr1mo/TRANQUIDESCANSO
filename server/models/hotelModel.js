import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const hotel = db.define('hotel',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    nombre:{type: DataTypes.STRING},
    direccion:{type: DataTypes.STRING},
    anio_inaguracion:{type: DataTypes.DATE},
    antiguedad:{type: DataTypes.NUMBER},
    id_ciudad:{type: DataTypes.NUMBER},
},{
    timestamps:false,
    tableName: 'hotel'
});

export default hotel;