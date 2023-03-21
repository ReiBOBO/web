//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin:thm007@cluster0.xwnqbtx.mongodb.net/todoListDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const workItems = [];
const itemsSchema = {
  name: String
};
const listSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];


async function insertDefaultItems() {
  try {
    await Item.insertMany(defaultItems);
    console.log("Successfully inserted default items");
    mongoose.connection.close();
  }
  catch (err) {
    console.log(err);
  }
}
// insertDefaultItems();


app.get("/", function(req, res) {
  async function findItems() {
    try {
      const foundItems = await Item.find({});
      if (foundItems.length === 0) {
        await Item.insertMany(defaultItems);
        res.redirect("/");
      } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
      console.log(foundItems);
    }
    catch (err) {
      console.log(err);
    }
  }
  findItems();
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  //create new item document
  const item = new Item({
    name: itemName
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else  {
    List.findOne({name: listName})
    .then(list => {
      if (list) {
        // show an existing list
        list.items.push(item);
        list.save();
        res.redirect("/" + listName);
      }
    });
  }
  });

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {

  async function deleteItem() {
    try {
  await Item.findByIdAndDelete(checkedItemId);
  console.log("Successfully deleted checked item");}
  catch (err) {
    console.log(err);
  }
  }
  deleteItem();
  res.redirect("/");}
  else{
    async function doSomething() {
      try {
        const foundList = await List.findOneAndUpdate(
          {name: listName},
          {$pull: {items: {_id: checkedItemId}}},
          {new: false}
        );
        if (!foundList) {
          console.error("List not found");
          return res.status(404).send("List not found");
        }
        res.redirect("/" + listName);
      } catch (err) {
        console.error("Error updating list: ", err);
        res.status(500).send("Server Error");
      }
    }
    
    doSomething();
    
  
  }

});

app.get("/:customListName", function(req, res){
  
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName})
    .then(list => {
      if (list) {
        // show an existing list
        res.render("list", {listTitle: customListName, newListItems: list.items});
      } else {
        // create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }
    })
    .catch(err => console.error(err));

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
