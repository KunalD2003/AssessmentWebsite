function ngrokSkipBrowserWarning(req, res, next) {
    // Set the ngrok-skip-browser-warning header with any value in every response
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next(); // Call the next middleware function in the stack
  }
  
  module.exports = ngrokSkipBrowserWarning;
  