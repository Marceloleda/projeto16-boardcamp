import { db } from "../database/database.connection.js";
export async function clientes_get(req, res){
    try{
        const clientes = await db.query(`SELECT * FROM customers;`);
        res.status(200).send(clientes.rows);

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}
export async function clientes_id(req, res){
    const {id} = req.params;
    try{
        const user = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        res.send(user.rows[0])

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}
export async function clientes_post(req, res){
    const {name, phone, cpf, birthday} = req.body;
    try{
        await db.query(`INSERT INTO  customers ("name", "phone", "cpf", "birthday") 
        VALUES ('${name}', '${phone}', '${cpf}', '${birthday}');`);
        res.sendStatus(201)

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}
export async function clientes_put(req, res){
    const {name, phone, cpf, birthday} = req.body;
    const {id} = req.params;
    try{
        await db.query(`UPDATE customers SET 
        name = '${name}', phone = '${phone}',
         cpf = '${cpf}', birthday = '${birthday}'
         WHERE id = $1;`, [id]) ;
        res.sendStatus(200)

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}
