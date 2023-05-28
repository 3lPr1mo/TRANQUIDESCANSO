import pagoModel from "../models/pagoModel.js";

export const getAllPago = async (req,res) =>{
    try {
        const Pago = await pagoModel.findAll()
        res.json(Pago)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getPago = async (req,res)=>{
    try {
        const PagoIn = await pagoModel.findAll({
            where:{id:req.params.id}
        })
        res.json(PagoIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createPago = async(req,res)=>{
    try {
        await pagoModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updatePago = async(req,res)=>{
    try {
        await pagoModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deletePago = async (req,res) =>{
    try {
        await pagoModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}