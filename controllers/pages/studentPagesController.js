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

const getPageWithId = (req, res) => {
    let page_id = req.query.page_id;
    pageCollection.getPageWithId(page_id).then(page => {
        if (!page){
            res.status(204).send();
        } else {
            res.status(200).send({title: page.title, description: page.description});
        }
    })
}

const getPagesWithTitleContaining = async (req, res) => {
    let searchTerm = req.query.searchTerm;
    pageCollection.getPagesWithTitleContaining(searchTerm).then(pages => {
        res.send(pages);
    })
}

module.exports = {createPage, getPagesWithTitleContaining, getPageWithId};