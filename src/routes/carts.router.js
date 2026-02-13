import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json");

// POST / (crear carrito)
router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();
    res.json(cart);
});

// GET /:cid (productos del carrito)
router.get("/:cid", async (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(id);

    cart ? res.json(cart.products) : res.status(404).send("Carrito no encontrado");
});

// POST /:cid/product/:pid (agregar producto)
router.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const updatedCart = await cartManager.addProductToCart(cid, pid);

    updatedCart ? res.json(updatedCart) : res.status(404).send("Carrito no encontrado");
});

export default router;