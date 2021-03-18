const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'src', 'static')));

//redirect all routes to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve('src', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));

app.use('/.netlify/functions/api');
