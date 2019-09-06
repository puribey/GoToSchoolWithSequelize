# Node.js + PostgreSQL + Sequelize

### Some terms
- ORM: Object Relation Mapping (E.g.: Sequelize)

### Initial Steps:
1. Download PostgreSQL(v11.1)
2. Open pgAdmin4 (should come with PostgreSQL)
3. Create DB there
- Go to Databases >> Create Database
- Inside that db go to Schemas >> Tables >> Create table

### Create App
- npm init to crete `package.json` file
- Install stuff:
```
npm i express body-parser sequelize pg pg-hstore express-handlebars
```
- Dev dependency
```
npm i -D nodemon
```
- create scripts 
```
"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
  },
```
- Initialize express in `app.js`

### Implement Sequelize

1. Init Sequelize
Inside config > `database.js`:
```
const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(
  "codegig",
  process.env.DB_USER,
  process.env.DB_USER_PSW,
  {
    host: "localhost",
    dialect: "postgres"
  }
);
```
Inside `app.js`:
```
const db = require('./config/database')
```

2. Test db
Inside `app.js`:
```
db.authenticate()
.then(()=> console.log("DB connected"))
.catch(err => console.log('Error:' + err))
```
3. Create a model for the resource
Inside models > `Gig.js` (models conventionally are capitalized):
```
const Sequelize = require("sequelize");
const db = require("../config/database");

const Gig = db.define("gig", {
  title: {
    type: Sequelize.STRING
  },
  technologies: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.STRING
  },
  contact_email: {
    type: Sequelize.STRING
  }
});

module.exports = Gig;
```
4. Routing
Inside `app.js`:
```
app.use('/gigs', require('./routes/gigs));
```
Inside routes > `gigs.js`:
```
const express = require('express')
const router = express.Router();

router.get('/', (req, res) => res.send('GIGS'));

module.exports = router;
```






