const express = require('express')
const app = express();
const userDbConnection = require('./services/database/dbConnection')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const notificationService = require('./services/users/notificationService');

app.set('port', (process.env.PORT || 5000))

const userRoute = require('./routes/users/userRoute');
app.use('/api/user', userRoute);

const studentPageRoute = require('./routes/pages/studentPagesRoute');
app.use('/api/page', studentPageRoute);

const contributionRoute = require('./routes/pages/contributionRoute');
app.use('/api/page', contributionRoute);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})