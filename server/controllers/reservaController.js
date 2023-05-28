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
        const ReservaIn = await reservaModel.findAll({
            where:{id:req.params.id}
        })
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