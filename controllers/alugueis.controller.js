import { db } from "../database/database.connection.js";
export async function alugueis_get(req, res){
    try{
        const alugueis = await db.query(`SELECT * FROM rentals;`);
        res.status(200).send(alugueis.rows);

    }
    catch(error){
        console.log(error.message);
        return res.sendStatus(422);
    }
}

export async function PostRentals(req, res) {
	const rental = req.body;
	const pricePerDay = res.locals.pricePerDay;
	try {
		const query = `
			INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
			VALUES ($1, $2, $3, $4, null, $5, null);
		`;
		await db.query(query, [
			rental.customerId,
			rental.gameId,
			dayjs().format('YYYY-MM-DD'),
			rental.daysRented,
			rental.daysRented * pricePerDay
		]);
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}