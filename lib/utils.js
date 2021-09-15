'use strict'

function isAPIRequest(req) {
  return req.originalUrl.startsWith(('/api/') === 0);
}

module.exports = {
    isAPIRequest
}