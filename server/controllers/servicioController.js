import servicioModel from "../models/servicioModel.js";

export const getAllServicio = async (req,res) =>{
    try {
        const Ciudad = await servicioModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getServicio = async (req,res)=>{
    try {
        const ciudadIn = await servicioModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createServicio = async(req,res)=>{
    try {
        await servicioModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateServicio = async(req,res)=>{
    try {
        await servicioModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteServicio = async (req,res) =>{
    try {
        await servicioModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}