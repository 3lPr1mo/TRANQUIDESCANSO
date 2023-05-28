import titularModel from "../models/titularModel.js";

export const getAllTitular = async (req,res) =>{
    try {
        const Ciudad = await titularModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTitular = async (req,res)=>{
    try {
        const ciudadIn = await titularModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTitular = async(req,res)=>{
    try {
        await titularModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTitular = async(req,res)=>{
    try {
        await titularModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTitular = async (req,res) =>{
    try {
        await titularModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}