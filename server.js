const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const helmet = require('helmet'); // Security middleware
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow specific origins, methods, and headers
app.use(
  cors({
    origin: ['http://localhost:5000'], // Adjust origin as needed for production
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

// Configure Helmet with custom CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://maps.googleapis.com"], // Allow Google Maps scripts
        connectSrc: [
          "'self'",
          "https://json-barrier-server.onrender.com",
          "http://localhost:5000",
          "https://maps.googleapis.com",
          "https://events.launchdarkly.com" // Allow LaunchDarkly API
        ],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"], // Allow Google Fonts styles and inline styles
        imgSrc: ["'self'", "https://maps.gstatic.com"], // Allow Google Maps images
        fontSrc: ["'self'", "https://fonts.gstatic.com"], // Allow Google Fonts
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
