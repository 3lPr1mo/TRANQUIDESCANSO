import pago_reservaModel from "../models/pago_reservaModel.js";

export const getAllPagoRes = async (req,res) =>{
    try {
        const PagoRes = await pago_reservaModel.findAll()
        res.json(PagoRes)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getPagoRes = async (req,res)=>{
    try {
        const PagoResIn = await pago_reservaModel.findAll({
            where:{id_reserva:req.params.id}
        })
        res.json(PagoResIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createPagoRes = async(req,res)=>{
    try {
        await pago_reservaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updatePagoRes = async(req,res)=>{
    try {
        await pago_reservaModel.update(req.body,{
            where:{id_reserva:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deletePagoRes = async (req,res) =>{
    try {
        await pago_reservaModel.destroy({
            where: {id_reserva: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}