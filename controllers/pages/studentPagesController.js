const pageCollection = require('../../services/database/studentPageDocConnection');
const userPageCollection = require('../../services/database/userPageDocConnection');

const createPage = async (req, res) => {
    let body = req.body;
    if (!body.title || !body.description || !body.owner_id){
        res.status(400).send();
    }
    let pageDoc = {title: body.title, description: body.description, owner_id: body.owner_id};
    let pageCreated = await pageCollection.createPage(pageDoc);
    if (!pageCreated){
        res.status(500).send({error: "Page not created"});
    } else {
        let user_id = body.owner_id;
        let page_id = pageCreated._id;
        let onwershipClaimed = await userPageCollection.claimOwnership(user_id, page_id);
        if (!onwershipClaimed){
            res.status(500).send({error: "Ownership not claimed"});
        } else {
            let userFollowingNewPage = await userPageCollection.followPage(user_id, page_id);
            if (!userFollowingNewPage){
                res.status(500).send({error: "User not following new page."})
            } else {
                res.status(200).send({page_id: page_id});
            }
        }
    }
}

const getFollowingPages = async (req, res) => {
    let user_id = req.query.user_id;
    
    let followingPages = await userPageCollection.getFollowingPages(user_id);
    if (!followingPages){
        res.status(500).send({error: "Return null"});
    } else {
        let pages = [];
        for (let i = 0; i < followingPages.following.length; i++){
            let page = await pageCollection.getPageWithId(followingPages.following[i]);
            let pageObj = {titles: page.title, descriptions: page.description, page_id: followingPages.following[i]};
            pages.push(pageObj);
        }
           
            
        console.log(pages)
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
    console.log(searchTerm)
    pageCollection.getPagesWithTitleContaining(searchTerm).then(pages => {
        res.send(pages);
    })
}

const followPage = async (req, res) => {
    let user_id = req.body.user_id;
    let page_id = req.body.page_id;

    let alreadyFollowing = await userPageCollection.getFollowingPages(user_id);
    // res.send(alreadyFollowing)
    if (alreadyFollowing.following.includes(page_id)){
        userPageCollection.unfollowPage(user_id, page_id).then(success => {
            if (!success){
                res.status(500).send({error: "Could not unfollow page"});
            } else {
                res.status(200).send();
            }
        });
    }else {
        userPageCollection.followPage(user_id, page_id).then(success => {
            if (!success){
                res.status(500).send({error: "Could not follow page"});
            } else {
                res.status(200).send();
            }
        })
    }

}

const getPageWithVal = async (req, res) => {
    let operator = req.query.operator;
    let query = req.query.query;
    let value = req.query.value;

    switch(operator){
        case "title":
            pageCollection.getPageWithVal({title: query}).then(page => {
                if (!page){
                    res.status(204).send();
                } else {
                    if (value === "_id"){
                        res.status(200).send({page_id: page._id});

                    }
                }
            })
    }
    
}

const isUserFollowing = async (req, res) => {
    let user_id = req.query.user_id;
    let page_id = req.query.page_id;
    userPageCollection.getFollowingPages(user_id).then(doc => {
        if (!doc){
            res.status(400).send({error: "Didn't return UserPageDoc."});
        }
        else if (doc.following.includes(page_id)){
            res.status(200).send()
        } else {
            res.status(204).send();
        }
    })
}
module.exports = {
    createPage, 
    getPagesWithTitleContaining, 
    getPageWithId, 
    getFollowingPages, 
    followPage,
    getPageWithVal, 
    isUserFollowing
    
};