import { clientesSchema } from "../models/clientes.schemas.model.js";
import { db } from "../database/database.connection.js";

export async function validateClientes(req, res, next){
    const {body} = req;
    const {cpf} =req.body
    const validation = clientesSchema.validate(body, {abortEarly: false})
    const exist_cpf = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
    console.log(exist_cpf.rowCount)
    try{
        if(exist_cpf.rowCount >= 1){
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
export async function validateClientesUpdate(req, res, next){
    const {body} = req;
    const {cpf} =req.body
    const validation = clientesSchema.validate(body, {abortEarly: false})
    const exist_cpf = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf])
    console.log(exist_cpf.rows.length)
    try{
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            console.log(errors)
            res.sendStatus(400)
            return;
        }
        if(exist_cpf.rows.length > 0 ){
            return next()
        }
        else{
            res.sendStatus(409)
            return
        }
        next()
        
    }
    catch(error){
    res.sendStatus(422)
    return
    }
}
export async function validateClientesId(req, res, next){
    const {id} =req.params
    try{
        const exist = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id])
        if(exist.rowCount === 0){
        res.sendStatus(404)
        return
        }
        
        next()
    }
    catch(error){
    res.sendStatus(422)
    return
    }
}
