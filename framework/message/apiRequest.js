const fetch = require('node-fetch')
module.exports = (url, api) => {
    return fetch(url, {headers: {'x-api-key': api} })
    .then(response => response.json())
    .then(data => data)
}
