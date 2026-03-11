const upload = require("../utils/multerConfig");
const parseFile = require("../utils/parseFile");
const generateSummary = require("../services/aiService");
const sendEmail = require("../services/emailService");
const path = require("path");

exports.uploadFile = (req, res) => {

  upload.single("file")(req, res, async function (err) {

    if (err) {
      return res.status(500).json({ message: "File upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {

      const email = req.body.email;

      const filePath = path.join("uploads", req.file.filename);

      const parsedData = await parseFile(filePath);

      const summary = await generateSummary(parsedData);

      // 🔹 Send Email
      await sendEmail(email, summary);

      res.json({
        message: "Summary generated and email sent",
        summary: summary
      });

    } catch (error) {

      res.status(500).json({
        message: "Processing failed",
        error: error.message
      });

    }

  });

};