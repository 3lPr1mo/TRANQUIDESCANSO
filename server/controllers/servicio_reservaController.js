import servicio_reservaModel from "../models/servicio_reservaModel.js";

export const getAllServRes = async (req,res) =>{
    try {
        const ServRes = await servicio_reservaModel.findAll()
        res.json(ServRes)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getServRes = async (req,res)=>{
    try {
        const ServResIn = await servicio_reservaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ServResIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createServRes = async(req,res)=>{
    try {
        await servicio_reservaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateServRes = async(req,res)=>{
    try {
        await servicio_reservaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteServRes = async (req,res) =>{
    try {
        await servicio_reservaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}