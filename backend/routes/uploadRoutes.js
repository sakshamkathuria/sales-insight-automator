const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload sales file and generate AI summary
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: AI summary generated and email sent
 */
router.post("/upload", uploadController.uploadFile);

module.exports = router;