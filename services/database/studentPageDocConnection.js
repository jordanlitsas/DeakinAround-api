const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const studentPageModel = mongoose.model('student_page', schemas.studentPage);

const createPage = async (pageData) => {
    let page = new studentPageModel(pageData);
    let newPage = await page.save();
    return newPage;
}



module.exports = {
   createPage
}