

const getToDoList = async (req, res, day, Item, defaultItems, List, errorText, validationText, notificationText) => {

    try {
        const itemsListResult = await Item.find({})
        if (itemsListResult.length === 0) {
            await Item.insertMany(defaultItems)
            res.redirect("/")

        } else {
            const listResult = await List.find({});
            
            res.render("list", {
                listTitle: day,
                newListItems: itemsListResult,
                customList: listResult,
                errorMessage: errorText,
                modalTitle: validationText,
                notification: notificationText
            })
            errorText.length = 0;
            validationText.length = 0;
            notificationText.length = 0;
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }
};



const getCustomList = async (req, res, List, errorText, validationText, notificationText) => {

    const { customListName } = req.params;
    const requestListName = (customListName).charAt(0).toUpperCase() +
        (customListName).slice(1).toLowerCase();

    try {
        const result = await List.findOne({ name: requestListName }).exec();
        
        if (result) {
            const listResult = await List.find({});
                        
            res.render("list", {
                listTitle: result.name,
                newListItems: result.items, 
                customList: listResult,
                errorMessage: errorText,
                modalTitle: validationText,
                notification: notificationText
            })
            errorText.length = 0;
            notificationText.length= 0;
        } else {
            validationText.push(`${requestListName}`)
            res.redirect("/")
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}


module.exports = {
    getToDoList,
    getCustomList
}
