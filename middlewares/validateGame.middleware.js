import { gameSchema } from "../models/games.schemas.model.js";
import { db } from "../database/database.connection.js";

export async function validateGame(req, res, next){
    const {body} = req;
    const {name} =req.body
    const validation = gameSchema.validate(body, {abortEarly: false})
    const exist = await db.query(`SELECT * FROM games WHERE name = '${name}'`)
    try{
        if(exist.rowCount !== 0){
            res.sendStatus(409)
            return
        }
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            console.log(errors)
            res.sendStatus(400)
            return;
        }

        next()
    }
    catch(error){
    res.sendStatus(422)
    return
    }
}