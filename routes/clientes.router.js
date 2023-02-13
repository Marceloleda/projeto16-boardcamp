import { Router } from "express";
import { clientes_get, clientes_id, clientes_post, clientes_put } from "../controllers/clientes.controller.js";
import { validateClientes, validateClientesId, validateClientesUpdate } from "../middlewares/validateClientes.middleware.js";


const router = Router();

router.get("/customers", clientes_get)
router.get("/customers/:id",validateClientesId, clientes_id)
router.post("/customers", validateClientes, clientes_post)
router.post("/customers/:id", validateClientesId,validateClientesUpdate, clientes_put)


export default router;