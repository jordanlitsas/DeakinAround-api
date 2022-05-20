const pageCollection = require('../../services/database/studentPageDocConnection');
const createPage = (req, res) => {
    let body = req.body;
    if (!body.title || !body.description || !body.owner_id){
        res.status(400).send();
    }
    let pageDoc = {title: body.title, description: body.description, owner_id: body.owner_id};
    pageCollection.createPage(pageDoc).then(success => {
        if (!success){
            res.status(500).send();
        } else {
            res.status(200).send({page_id: success._id.toString()});
        }
    })


}

module.exports = {createPage};