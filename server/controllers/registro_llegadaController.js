import registro_llegadaModel from "../models/registro_llegadaModel.js";

export const getAllResLlega = async (req,res) =>{
    try {
        const Ciudad = await registro_llegadaModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getResLlega = async (req,res)=>{
    try {
        const ciudadIn = await registro_llegadaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createResLlega = async(req,res)=>{
    try {
        await registro_llegadaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateResLlega = async(req,res)=>{
    try {
        await registro_llegadaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteResLlega = async (req,res) =>{
    try {
        await registro_llegadaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}