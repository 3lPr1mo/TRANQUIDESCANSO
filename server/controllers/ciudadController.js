import ciudadModel from "../models/ciudadModel.js";

export const getAllCiudad = async (req,res) =>{
    try {
        const Ciudad = await ciudadModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCiudad = async (req,res)=>{
    try {
        const ciudadIn = await ciudadModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCiudad = async(req,res)=>{
    try {
        await ciudadModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateCiudad = async(req,res)=>{
    try {
        await ciudadModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteCiudad = async (req,res) =>{
    try {
        await ciudadModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}