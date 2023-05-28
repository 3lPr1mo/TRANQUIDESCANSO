import hotelModel from "../models/hotelModel.js";

export const getAllHotel = async (req,res) =>{
    try {
        const Ciudad = await hotelModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getHotel = async (req,res)=>{
    try {
        const ciudadIn = await hotelModel.findAll({
            where:{id:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createHotel = async(req,res)=>{
    try {
        await hotelModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateHotel = async(req,res)=>{
    try {
        await hotelModel.update(req.body,{
            where:{id:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteHotel = async (req,res) =>{
    try {
        await hotelModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}