import habitacionModel from "../models/habitacionModel.js";

export const getAllHabitacion = async (req,res) =>{
    try {
        const Ciudad = await habitacionModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getHabitacion = async (req,res)=>{
    try {
        const ciudadIn = await habitacionModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createHabitacion = async(req,res)=>{
    try {
        await habitacionModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateHabitacion = async(req,res)=>{
    try {
        await habitacionModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteHabitacion = async (req,res) =>{
    try {
        await habitacionModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}