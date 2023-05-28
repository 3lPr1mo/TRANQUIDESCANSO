import categoriaModel from "../models/categoriaModel.js";

export const getAllCategoria = async (req,res) =>{
    try {
        const Ciudad = await categoriaModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCategoria = async (req,res)=>{
    try {
        const ciudadIn = await categoriaModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCategoria = async(req,res)=>{
    try {
        await categoriaModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateCategoria = async(req,res)=>{
    try {
        await categoriaModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteCategoria = async (req,res) =>{
    try {
        await categoriaModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}