import {db} from "../database/db.js";

export const getPeriodoTiempo = async (req,res)=>{ //---Reservas realizadas en un período de tiempo.
    try {
        const periodo = await db.query(
        `SELECT r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        WHERE r.fecha_inic >= '${req.params.fecha_inic}' AND r.fecha_fin <= '${req.params.fecha_fin}';`)
        res.json(periodo[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getReservasCan20 = async (req,res)=>{//---Reservas que fueron canceladas sin pagar el valor del 20% de anticipo.
    try {
        const cancelada = await db.query(
        `SELECT r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        LEFT JOIN pago_reserva pr ON r.id = pr.id_Reserva
        WHERE r.estado = 0 OR pr.total_pagado IS NULL;`)
        res.json(cancelada[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getReservasNo20 = async (req,res)=>{//---Reservas que no fueron utilizadas y pagaron el 20% de anticipo.
    try {
        const noUtilizadas = await db.query(
        `SELECT DISTINCT ON (r.id) r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        JOIN pago_reserva pr ON r.id = pr.id_Reserva
        WHERE r.estado = 1 AND pr.total_pagado >= (r.valor * 0.2) AND r.id_Llegada IS NULL;`)
        res.json(noUtilizadas[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getRegistroTiempo = async (req,res)=>{//---Reservas que tuvieron registro de llegada de los huéspedes a tiempo
    /*--Lo que hace es comparar si la fecha inicio es =  a la fecha de la tabla registro_llegada
    --La hora no es necesaria gracias al constraint que impide que metan horas que el problema no indica*/
    try {
        const Llegada = await db.query(
        `SELECT DISTINCT ON (r.id) r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        JOIN registro_llegada rl ON r.id_Llegada = rl.id
        WHERE r.estado = 1 AND rl.fecha = r.fecha_inic;`)
        res.json(Llegada[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getOrMascotas = async (req,res)=>{//---Reservas que registraron huéspedes menores de edad y/o mascotas.
    try {
        const ninosMascotas = await db.query(
        `SELECT r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        JOIN acompanante a ON r.id_Titular = a.id_Titular
        WHERE a.edad < 18 OR a.mascota = 1;`)
        res.json(ninosMascotas[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getServiciosAdici = async (req,res)=>{//---Reservas que pagaron servicios adicionales.
    try {
        const servicios = await db.query(
        `SELECT DISTINCT ON (r.id) r.id, r.fecha_inic, r.fecha_fin
        FROM reserva r
        JOIN servicio_reserva sr ON r.id = sr.id_Reserva
        JOIN pago_reserva pr ON r.id = pr.id_Reserva
        WHERE sr.total_costo IS NOT NULL AND pr.total_pagado > r.valor;`)
        res.json(servicios[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}

export const gethuespedesTitular = async (req,res)=>{//---Reservas que pagaron servicios adicionales.
    try {
        const servicios = await db.query(
        `SELECT t.id, t.nombre, t.direccion, a.id, a.nombre, a.edad, a.mascota
        FROM reserva r
        JOIN titular t ON r.id_Titular = t.id
        JOIN acompanante a ON t.id = a.id_Titular
        WHERE r.id = ${req.params.id};`)
        res.json(servicios[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}