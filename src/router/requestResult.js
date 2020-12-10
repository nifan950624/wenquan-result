const { requestResult } = require('../controller/requestResult')

const handleRequestRouter = (req, res) => {
    const method = req.method
    const postData = req.body

    if (method === 'GET' && req.path === '/') {
        const { url } = req.query
        if(!url) {
          return Promise.resolve('hello world!')
        }
        const result = requestResult(url)
        return result.then(data => {
            return data
        })
    }
}

module.exports = handleRequestRouter
