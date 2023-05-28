import registro_salidaModel from "../models/registro_salidaModel.js";

export const getAllRegSali= async (req,res) =>{
    try {
        const Ciudad = await registro_salidaModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getRegSali= async (req,res)=>{
    try {
        const ciudadIn = await registro_salidaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createRegSali = async(req,res)=>{
    try {
        await registro_salidaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateRegSali = async(req,res)=>{
    try {
        await registro_salidaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteRegSali = async (req,res) =>{
    try {
        await registro_salidaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}