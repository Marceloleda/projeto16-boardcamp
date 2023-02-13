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
export async function PostRentalsIdReturn(req, res) {
	const {id} = req.params;
	const delayFee = getDelayFee(res.locals);
	console.log(delayFee)
	try {
		const query = `
			UPDATE rentals
			SET "returnDate" = $1, "delayFee" = $2
			WHERE id = $3
		`;
		await db.query(query, [
			dayjs().format('YYYY-MM-DD'),
			delayFee,
			id
		]);
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}

function getDelayFee({rentDate, daysRented, pricePerDay}){
	const returnDate = dayjs(rentDate).add(daysRented, 'day').format('YYYY-MM-DD');
	const delayDays = dayjs().diff(dayjs(returnDate), 'day');
	return (delayDays > 0) ? delayDays * pricePerDay : 0;
}

export async function DeleteRentals(req, res) {
	const {id} = req.params;
	try {
		const query = `
			DELETE FROM rentals
			WHERE id = $1
		`;
		await db.query(query, [id]);
		res.sendStatus(200);
	} catch (error) {
		return res.status(500).send(error);
	}
}