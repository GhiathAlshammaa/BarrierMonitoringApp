const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const helmet = require('helmet'); // Security middleware
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

const apiRouter = jsonServer.router('barriers.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'dist/BarrierMonitoringApp')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/BarrierMonitoringApp/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});