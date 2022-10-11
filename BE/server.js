import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";

const app = express();
const port = 9000;

const pusher = new Pusher({
    appId: "1490206",
    key: "dbd84638dac8e73be809",
    secret: "727a47c6c5ce658bafec",
    cluster: "ap2",
    useTLS: true,
});

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

const connection_url =
    "mongodb+srv://hamza:hamza@whatsapp-mern.rwmcyht.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("db is connected");
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change) => {
        console.log("a change occur =>", change);
        if (change.operationType === "insert") {
            const messageContent = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageContent.name,
                message: messageContent.message,
            });
        } else {
            console.log("Error in pusher");
        }
    });
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "You Are live!!!" });
});

app.post("/api/message/new", (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/api/message/sync", (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(port, () => {
    console.log("Listening to " + port);
});
