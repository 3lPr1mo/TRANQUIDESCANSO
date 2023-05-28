import acompananteModel from "../models/acompananteModel.js";

export const getAllAcompanante = async (req,res) =>{
    try {
        const Ciudad = await acompananteModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getAcompanante = async (req,res)=>{
    try {
        const ciudadIn = await acompananteModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createAcompanante = async(req,res)=>{
    try {
        await acompananteModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateAcompanante = async(req,res)=>{
    try {
        await acompananteModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteAcompanante = async (req,res) =>{
    try {
        await acompananteModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}