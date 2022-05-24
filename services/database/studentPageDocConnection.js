const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const studentPageModel = mongoose.model('student_page', schemas.studentPage);

const createPage = async (pageData) => {
    let page = new studentPageModel(pageData);
    let newPage = await page.save();
    return newPage;
}

const getPageWithVal = async (query) => {
    let page = studentPageModel.findOne(query);
    return page;
}

const getPagesWithTitleContaining = async (titleSearch) => {
    let pages = studentPageModel.find({$text: {$search: { titleSearch}}});
    return pages;
}

const getPageWithId = async (page_id) => {
    let page = await studentPageModel.findById({_id: page_id});
    return page;
}

module.exports = {
   createPage,
   getPagesWithTitleContaining,
   getPageWithId,
   getPageWithVal
}