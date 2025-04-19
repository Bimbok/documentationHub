require("dotenv").config();
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Add this after your other middleware configurations
app.use(express.static(path.join(__dirname, "public")));

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception:', error);
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
}).then(() => {
    console.log("Successfully connected to MongoDB.");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const bdociSchema = new mongoose.Schema({
    title: String,
    document: String,
    code: String,
});
const doc = mongoose.model("Doc", bdociSchema);

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get("/", async (req, res) => {
    try {
        const documents = await doc.find({}).sort({ title: 1 }); // Sort alphabetically by title
        res.render("home", { documents });
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).send("Error loading documentation list");
    }
});

app.get("/admin", (req, res) => {
    res.render("admin/admin");
});

app.post("/admin", async (req, res) => {
    try {
        if (req.body.adminName === process.env.ADMIN_USERNAME && 
            req.body.password === process.env.ADMIN_PASSWORD) {
            res.render("admin/compose");
        } else {
            return res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login");
    }
});

app.post("/compose", async (req, res) => {
    try {
        const document = new doc({
            title: req.body.title,
            document: req.body.doc,
            code: req.body.code,
        });
        await document.save();
        res.render("admin/compose");
    } catch (error) {
        console.error("Error saving document:", error);
        res.status(500).send("Error saving document");
    }
});

app.get("/:title", async (req, res) => {
    try {
        const requestedTitle = req.params.title;
        const document = await doc.findOne({ title: requestedTitle });

        if (!document) {
            return res.status(404).render("404");
        }

        res.render("index", {
            title: document.title,
            documentation: document.document,
            code: document.code,
        });
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).send("Error loading documentation");
    }
});

app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'ok',
        timestamp: new Date(),
        database: dbStatus
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        environment: process.env.NODE_ENV,
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Update your listen method
const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {  // Only listen when not on Vercel
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is Running at ${PORT}`);
    });
}

// Add this line at the end of your file
module.exports = app;  // Required for Vercel
