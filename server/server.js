const PORT = process.env.PORT || 4000;

const express = require('express');
const app = express();
const route = require('./app');
//const app = require('./app.js')
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
