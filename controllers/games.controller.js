import { db } from "../database/database.connection.js";
export async function games_get(req, res){
    try{
        const games = await db.query(`SELECT * FROM games;`);
        res.status(200).send(games.rows);

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}
export async function games_post(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;
    try{
        await db.query(`INSERT INTO  games ("name", "image", "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${pricePerDay});`);
        res.sendStatus(201)

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}