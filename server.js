const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();
const PORT = process.env.PORT || 5001;

const apiRouter = jsonServer.router('barriers.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'dist/BarrierMonitoringApp')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/BarrierMonitoringApp/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});