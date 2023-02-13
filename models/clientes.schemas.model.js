import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const joi = JoiBase.extend(JoiDate);


export const clientesSchema = joi.object({
    name: joi.string().required(),
	phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
	cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
	birthday: joi.string().isoDate().required()
})