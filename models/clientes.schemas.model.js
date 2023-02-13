import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";

const joi = JoiBase.extend(JoiDate);


export const clientesSchema = joi.object({
    name: joi.string().required(),
    phone:joi.string().min(10).max(11).required(),
    cpf: joi.string().min(11).max(11).required(),
    birthday: joi.date().format('YYYY-MM-DD').raw().required()
})