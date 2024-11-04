const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'X-LaunchDarkly-Event-Schema',
      'X-LaunchDarkly-User-Agent',
      'X-LaunchDarkly-Payload-ID',
      'X-LaunchDarkly-Wrapper',
      'X-LaunchDarkly-Tags',
    ],
    exposedHeaders: ['Date'],
    maxAge: 300,
  })
);

// Helmet with CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "maps.googleapis.com", "'unsafe-inline'"],
        connectSrc: [
          "'self'",
          "json-barrier-server.onrender.com",
          "localhost:5000",
          "maps.googleapis.com",
          "events.launchdarkly.com"
        ],
        styleSrc: ["'self'", "fonts.googleapis.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "maps.gstatic.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
      },
    },
  })
);

// Set up JSON server for API simulation
const apiRouter = jsonServer.router('barriers.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', apiRouter);

// Serve the Angular app from the 'dist' directory
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
