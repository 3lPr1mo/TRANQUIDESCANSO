import { db } from "../database/db";
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
    id_User:{type: DataTypes.STRING},
    id_Hotel:{type: DataTypes.NUMBER},
    id_Titular:{type: DataTypes.NUMBER},
    id_Llegada:{type: DataTypes.NUMBER},
    id_Salida:{type: DataTypes.NUMBER},
},{timestamps:false});

export default reserva;