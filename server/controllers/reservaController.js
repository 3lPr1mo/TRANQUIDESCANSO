import { db } from "../database/db.js";
import reservaModel from "../models/reservaModel.js";

export const getAllReserva = async (req,res) =>{
    try {
        const Reserva = await reservaModel.findAll()
        res.json(Reserva)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getReserva = async (req,res)=>{
    try {
        const ReservaIn = await db.query(
            `SELECT r.id, r.num_habitaciones, r.num_personas, r.fecha_inic, r.fecha_fin, r.valor, r.valor_servicios, r.estado,
            h.nombre AS nombre_hotel,
            t.nombre AS nombre_titular
            FROM reserva r
            JOIN hotel h ON r.id_Hotel = h.id
            JOIN titular t ON r.id_Titular = t.id WHERE r.id = ${req.params.id};`  
        )
        res.json(ReservaIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createReserva = async(req,res)=>{
    try {
        await reservaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateReserva = async(req,res)=>{
    try {
        await reservaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteReserva = async (req,res) =>{
    try {
        await reservaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}