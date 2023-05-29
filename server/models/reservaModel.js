import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const reserva = db.define('reserva',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    num_habitaciones:{type: DataTypes.NUMBER},
    num_personas:{type: DataTypes.NUMBER},
    fecha_inic:{type: DataTypes.DATE},
    fecha_fin:{type: DataTypes.DATE},
    valor:{type: DataTypes.REAL},
    valor_servicios:{type: DataTypes.REAL},
    estado:{type: DataTypes.NUMBER},
    id_titular:{type: DataTypes.STRING},
    id_hotel:{type: DataTypes.NUMBER},
    id_titular:{type: DataTypes.NUMBER},
    id_llegada:{type: DataTypes.NUMBER},
    id_salida:{type: DataTypes.NUMBER},
},{
    timestamps:false,
    tableName: 'reserva'
});

export default reserva;