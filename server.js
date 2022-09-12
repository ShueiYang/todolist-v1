const express = require("express");
const mongoose = require('mongoose');
const { createCustomList, deleteCustomList } = require("./controllers/customizelist");
const { getToDoList, getCustomList } = require("./controllers/getlist");
const { addItem, deleteItem } = require("./controllers/updatelist");

const app = express();
const date = require("./date")



app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
    const { Schema } = mongoose;
    try {
        await mongoose.connect('mongodb+srv://admin-shuei:tr228pq7e@cluster0.nmxfxgo.mongodb.net/todolistDB');
        
        const itemsSchema = new Schema({
            name: {
                type: String,
                required: [true]
            }
        })

        const listSchema = new Schema({
            name: String,
            items: [itemsSchema]
        })

        const Item = mongoose.model("Item", itemsSchema);
        const List = mongoose.model("List", listSchema)

        const item1 = new Item({ name: "Welcome to your todoList!" });
        const item2 = new Item({ name: "Hit the + button to add a new item." });
        const item3 = new Item({ name: "<== Hit this to delete an item." });

        const defaultItems = [item1, item2, item3]
        const errorText = [];
        const validationText = [];
        const notificationText = [];
        const day = date.getDate();
        
        
        app.get("/", (req, res) => {
            getToDoList(req, res, day, Item, defaultItems, List, errorText, validationText, notificationText)
        })

        app.get("/:customListName", (req, res) => {
            getCustomList(req, res, List, errorText, validationText, notificationText)
        })
       
        app.post("/", (req, res) => {
            addItem(req, res, day, Item, List, errorText)
        })
                
        app.post("/delete", (req, res) => {
            deleteItem(req, res, day, Item, List)
        })

        app.post("/search", (req, res) => {
            const requestListName = req.body.customList
            res.redirect(`/${requestListName}`)
        })

        app.post("/createlist", (req, res) => {
            createCustomList(req, res, List, defaultItems, notificationText)
        })

        app.post("/deletelist", (req, res) => {
            deleteCustomList(req, res, List, notificationText)
        })

    } catch (err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001
}

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})   


    
