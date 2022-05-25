const schemas = require('../../models/schemas');
const mongoose = require('mongoose');
const contributionModel = mongoose.model('contribution', schemas.contribution);

const build = async (contributionData) => {
    let contribution = new contributionModel(contributionData);
    return contribution;
}

module.exports = {build}