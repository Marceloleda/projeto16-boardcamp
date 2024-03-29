import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
	image: joi.string().required(),
	stockTotal: joi.number().greater(0).required(),
	categoryId: joi.number().required(),
	pricePerDay: joi.number().greater(0).required()
})


const rentalSchema = joi.object({
	customerId: joi.number().required(),
	gameId: joi.number().required(),
	daysRented: joi.number().greater(0).required()
});

export { rentalSchema};