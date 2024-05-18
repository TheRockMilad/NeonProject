const express = require("express");
const app = express();
const debug = require('debug')('app:main')
const router = require('./src/routes')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/api',router)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => debug(`listening on port ${PORT}`));
