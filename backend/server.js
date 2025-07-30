const express = require("express");
const app = express();
const Ticket = require("./models/schema.js");
const cors = require("cors");
const connectDB = require("./config/dbConnection.js");
const { start } = require("node:repl");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api", require("./routes/routes.js"));

const startServer = async () => {
    try {
        await connectDB();

        const sampleTicket = new Ticket({
            movie: 'Inception',
            slot: 'Evening',
            seats: {
                A1: 1,
                A2: 0,
                A3: 1,
                A4: 0,
                D1: 1,
                D2: 0,
            },
        });
        await sampleTicket.save();
        console.log("Connected to Mongodb");

        app.listen(8080, () => {
            console.log("app is listening on port 8080");
        });

    } catch (error) {
        console.log("Failed to Connect with Mongodb:", error);
    }
};

startServer();