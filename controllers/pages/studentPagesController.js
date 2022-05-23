const pageCollection = require('../../services/database/studentPageDocConnection');
const userPageCollection = require('../../services/database/userPageDocConnection');

const createPage = async (req, res) => {
    let body = req.body;
    if (!body.title || !body.description || !body.owner_id){
        res.status(400).send();
    }
    let pageDoc = {title: body.title, description: body.description, owner_id: body.owner_id};
    pageCollection.createPage(pageDoc).then(async success => {
        if (!success){
            res.status(500).send();
        } else {
            success = await userPageCollection.claimOwnership(success._id, body.owner_id);
            if (success){
                res.status(200).send({page_id: success._id.toString()});
            } else {
                res.status(500).send({error: "Could not claim ownership of page"});
            }
        }
    })
}

const getFollowingPages = async (req, res) => {
    let user_id = req.query.user_id;
    let followingPages_id = await userPageCollection.getFollowingPages(user_id);
    if (!followingPages_id){
        res.status(500).send();
    } else {
        console.log(followingPages_id);
        let pages = [];
        for (let i = 0; i < followingPages_id.length; i++){
            let page = await pageCollection.getPageWithId(followingPages_id[i]);
            let pageObj = {title: page.title, description: page.description};
            console.log(pageObj)
            pages.push(pageObj);
        }
           
            
       
        res.status(200).send(pages);
    }
}

const getPageWithId = async (req, res) => {
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

const followPage = async (req, res) => {
    let user_id = req.body.user_id;
    let page_id = req.body.page_id;
    userPageCollection.followPage(user_id, page_id).then(success => {
        if (!success){
            res.status(500).send({error: "Could not follow page"});
        } else {
            res.status(200).send();
        }
    })
}

module.exports = {createPage, getPagesWithTitleContaining, getPageWithId, getFollowingPages, followPage};