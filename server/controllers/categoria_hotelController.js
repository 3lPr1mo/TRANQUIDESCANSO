import categoria_hotelModel from "../models/categoria_hotelModel.js";

export const getAllCategoHote = async (req,res) =>{
    try {
        const CategoHote = await categoria_hotelModel.findAll()
        res.json(CategoHote)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getCategoHote = async (req,res)=>{
    try {
        const CategoHoteIn = await categoria_hotelModel.findAll({
            where:{id:req.params.id}
        })
        res.json(CategoHoteIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createCategoHote = async(req,res)=>{
    try {
        await categoria_hotelModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateCategoHote = async(req,res)=>{
    try {
        await categoria_hotelModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteCategoHote = async (req,res) =>{
    try {
        await categoria_hotelModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}