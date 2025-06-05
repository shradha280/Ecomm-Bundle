const express = require('express');
const Bundle = require('../models/Bundle');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bundle:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - products
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             type: string
 *         discount:
 *           type: number
 */

/**
 * @swagger
 * /bundles:
 *   get:
 *     summary: Retrieve all bundles
 *     tags: [Bundles]
 *     responses:
 *       200:
 *         description: A list of bundles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bundle'
 */
  

router.post('/', async (req, res) => {
    const { sellerId, products, title, description } = req.body;
    if (products.length < 2) return res.status(400).send('A bundle must have at least 2 products.');
    const bundle = new Bundle({ sellerId, products, title, description });
    await bundle.save();
    res.status(201).json(bundle);
});

router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const bundles = await Bundle.find().skip((page - 1) * limit).limit(Number(limit));
    res.json(bundles);
});

router.patch('/:id', async (req, res) => {
    const bundle = await Bundle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bundle);
});

router.delete('/:id', async (req, res) => {
    await Bundle.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

router.get('/:id/checkDiscount', async (req, res) => {
    const bundle = await Bundle.findById(req.params.id);
    if (!bundle) return res.status(404).send('Bundle not found');
    const total = bundle.products.reduce((acc, prod) => {
        const price = prod.onSale ? prod.salePrice : prod.price;
        return acc + price;
    }, 0);
    const discount = total * 0.10;
    res.json({ total, discount, finalPrice: total - discount });
});

module.exports = router;