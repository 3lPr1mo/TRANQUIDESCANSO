import tipo_habitacionModel from "../models/tipo_habitacionModel.js";

export const getAllTipHabi = async (req,res) =>{
    try {
        const Ciudad = await tipo_habitacionModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTipHabi = async (req,res)=>{
    try {
        const ciudadIn = await tipo_habitacionModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTipHabi = async(req,res)=>{
    try {
        await tipo_habitacionModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTipHabi = async(req,res)=>{
    try {
        await tipo_habitacionModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTipHabi = async (req,res) =>{
    try {
        await tipo_habitacionModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}