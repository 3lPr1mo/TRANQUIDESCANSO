import {db} from "../database/db.js";

export const getVistaHotel = async (req,res)=>{
    try {
        const vista = await db.query(
        `SELECT*FROM vista_hotel;`)
        res.json(vista[0]) 
    } catch (error) {
        res.json({message: error.message})
    }
}