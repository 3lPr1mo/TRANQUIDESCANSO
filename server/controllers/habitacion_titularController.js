import habitacion_titularModel from "../models/habitacion_titularModel.js";

export const getAllHabiTitul = async (req,res) =>{
    try {
        const Ciudad = await habitacion_titularModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getHabiTitul = async (req,res)=>{
    try {
        const ciudadIn = await habitacion_titularModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createHabiTitul = async(req,res)=>{
    try {
        await habitacion_titularModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateHabiTitul = async(req,res)=>{
    try {
        await habitacion_titularModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteHabiTitul = async (req,res) =>{
    try {
        await habitacion_titularModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}