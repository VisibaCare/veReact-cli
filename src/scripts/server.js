const { setPaths, getPaths } = require('../paths');
setPaths();

const paths = getPaths();

const { join, resolve } = require('path');
const express = require('express');
const compression = require('compression');

// Init app
const server = express();
const port = 3005;

// Gzip
server.use(compression())

// Cache
server.use(express.static(paths.appBuild, {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.match(/(sw.js|index.html)$/)) {
      res.setHeader('Cache-Control', 'dist, max-age=0');
    }
  },
}));

// Index route
server.use((req, res) => res.sendFile(join(paths.appBuild, 'index.html')));

// Listen
server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
})
