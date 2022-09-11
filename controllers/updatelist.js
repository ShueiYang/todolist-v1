

const addItem = (req, res, day, Item, List, errorText) => {

    const itemName = req.body.newItem
    const customListName = req.body.listName
    
    const item = new Item({ name: itemName })

    if (itemName.length === 0) {
        errorText.push("Please provide a name to add on the list")
    }

    if (customListName === day) {
        item.save(function (err) {
            if (err) {
                console.log(`ERROR NO NAME: ${err}`)
                res.redirect("/");
            } else {
                res.redirect("/");
            }
        });
    } else {
        List.findOne({ name: customListName }, function (err, foundList) {
            if (!err) {
                foundList.items.push(item)
                foundList.save(function (err) {
                    if (err) {
                        console.log(`ERROR NO NAME: ${err}`)
                        res.redirect(`/${customListName}`);
                    } else {
                        res.redirect(`/${customListName}`);
                    } 
                });
                
            }
        })
    }
}



const deleteItem = (req, res, day, Item, List) => {

    const itemId = req.body.checkbox
    const customListName = req.body.listName
    
    if (customListName === day) {
        Item.findByIdAndDelete(itemId, function (err) {
            if (!err) {
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate(
            { name: customListName },
            { $pull: { items: { _id: itemId } } },
            function (err) {
                if (!err) {
                    res.redirect(`/${customListName}`);
                }
            }
        )
    }
}


module.exports = {
    addItem,
    deleteItem
}