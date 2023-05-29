import telefono_titularModel from "../models/telefono_titularModel.js";

export const getAllTelTitul = async (req,res) =>{
    try {
        const Ciudad = await telefono_titularModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTelTitul = async (req,res)=>{
    try {
        const ciudadIn = await telefono_titularModel.findAll({
            where:{id_titular:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTelTitul = async(req,res)=>{
    try {
        await telefono_titularModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTelTitul = async(req,res)=>{
    try {
        await telefono_titularModel.update(req.body,{
            where:{id_titular:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTelTitul = async (req,res) =>{
    try {
        await telefono_titularModel.destroy({
            where: {id_titular: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}