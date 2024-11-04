const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const helmet = require('helmet'); // Security middleware
const app = express();
const PORT = process.env.PORT || 5000;

// Configure Helmet with custom CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://json-barrier-server.onrender.com", "http://localhost:5000"], // Allow external API and localhost
      },
    },
  })
);

const apiRouter = jsonServer.router('barriers.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'dist/BarrierMonitoringApp')));

app.get('/*', function (req, res) {
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
