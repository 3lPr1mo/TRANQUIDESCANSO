import agenciaModel from "../models/agenciaModel.js";

export const getAllAgencia = async (req,res) =>{
    try {
        const Ciudad = await agenciaModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getAgencia = async (req,res)=>{
    try {
        const ciudadIn = await agenciaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createAgencia = async(req,res)=>{
    try {
        await agenciaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateAgencia = async(req,res)=>{
    try {
        await agenciaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteAgencia = async (req,res) =>{
    try {
        await agenciaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}