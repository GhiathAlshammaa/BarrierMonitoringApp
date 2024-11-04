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
        scriptSrc: ["'self'", "https://maps.googleapis.com", "'unsafe-inline'"],
        scriptSrcAttr: ["'unsafe-inline'"],  
        connectSrc: [
          "'self'",
          "https://json-barrier-server.onrender.com",
          "http://localhost:5000",
          "https://maps.googleapis.com",
          "https://events.launchdarkly.com"
        ],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "https://maps.gstatic.com", "https://maps.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
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
