import usuarioModel from "../models/usuarioModel.js";

export const getAllUser = async (req,res) =>{
    try {
        const User = await usuarioModel.findAll()
        res.json(User)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getUser = async (req,res)=>{
    try {
        const UserIn = await usuarioModel.findAll({
            where:{id:req.params.id}
        })
        res.json(UserIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createUser = async(req,res)=>{
    try {
        await usuarioModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateUser = async(req,res)=>{
    try {
        await usuarioModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteUser = async (req,res) =>{
    try {
        await usuarioModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}