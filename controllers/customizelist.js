
const createCustomList = (req, res, List, defaultItems, notificationText) => {
    
    const customListName = req.body.title
    const requestListName = customListName.charAt(0).toUpperCase() +
    customListName.slice(1).toLowerCase();

    const list = new List({
        name: requestListName,
        items: defaultItems
    })
    list.save(function (err) {
        if(!err) {
           notificationText.push(`${requestListName} successfully created in the custom list`) 
           res.redirect(`/${requestListName}`) 
        }
    });
}

const deleteCustomList = (req, res, List, notificationText) => {
    const requestListName = req.body.listName

    List.findOneAndDelete( {name: requestListName}, function(err) {
        if (!err) {
            notificationText.push(`${requestListName} successfully deleted from the custom list`)
            res.redirect("/")
        }
    })
}

module.exports = {
    createCustomList,
    deleteCustomList
}
