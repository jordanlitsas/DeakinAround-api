const express = require('express')
const app = express();
const userDbConnection = require('./services/database/dbConnection')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))

const userRoute = require('./routes/users/userRoute');
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
  res.send("<h1>Welcome</h1>");
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})