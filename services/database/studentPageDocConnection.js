const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const studentPageModel = mongoose.model('student_page', schemas.studentPage);

const createPage = async (pageData) => {
    let page = new studentPageModel(pageData);
    let newPage = await page.save();
    return newPage;
}

const getUserFollowedPage = async (user_id) => {
    
}

const getPagesWithTitleContaining = async (titleSearch) => {
    let pages = studentPageModel.find({$text: {$search: { titleSearch}}});
}

const getPageWithId = (page_id) => {
    let page = await studentPageModel.findById({id: page_id});
    return page;
}

module.exports = {
   createPage,
   getPagesWithTitleContaining,
   getPageWithId
}