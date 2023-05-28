import telefono_hotelModel from "../models/telefono_hotelModel.js";

export const getAllTelHotel = async (req,res) =>{
    try {
        const Ciudad = await telefono_hotelModel.findAll()
        res.json(Ciudad)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTelHotel = async (req,res)=>{
    try {
        const ciudadIn = await telefono_hotelModel.findAll({
            where:{id_hotel:req.params.id}
        })
        res.json(ciudadIn)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTelHotel = async(req,res)=>{
    try {
        await telefono_hotelModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTelHotel = async(req,res)=>{
    try {
        await telefono_hotelModel.update(req.body,{
            where:{id_hotel:req.params.id}
        })
        res.json({"message":"¡Registro creado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTelHotel = async (req,res) =>{
    try {
        await telefono_hotelModel.destroy({
            where: {id_hotel: req.params.id}
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch (error) {
        res.json({message: error.message})
    }
}