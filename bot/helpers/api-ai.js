'use strict'

const rp = require('minimal-request-promise')

module.exports = function apiAiQuery(text, sessionId, token) {
  return rp.post('https://api.api.ai/v1/query?v=20161120', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: text,
      lang: 'en',
      sessionId: sessionId
    })
  })
    .then(data => {
      console.log('Data', data.body)
      let response = JSON.parse(data.body)
      if (!response && typeof response.result !== 'object')
        throw new Error('I do not understand')

      return {
        action: response.result.action,
        params: response.result.parameters.simplified,
        reply: response.result.fulfillment.speech,
        score: response.result.score
      }
    })
}
