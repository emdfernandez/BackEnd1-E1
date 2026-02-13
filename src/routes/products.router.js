import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./product.json");

// GET /
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

// GET /:pid
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    product ? res.json(product) : res.status(404).send("Producto no encontrado");
});

// POST /
router.post("/", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);
    res.json(newProduct);
});

// PUT /:pid
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const updated = await productManager.updateProduct(id, req.body);

    updated ? res.json(updated) : res.status(404).send("Producto no encontrado");
});

// DELETE /:pid
router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    await productManager.deleteProduct(id);
    res.send("Producto eliminado");
});

export default router;