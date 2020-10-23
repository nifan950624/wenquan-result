const { requestResult } = require('../controller/requestResult')

const handleRequestRouter = (req, res) => {
    const method = req.method
    const postData = req.body

    if (method === 'GET' && req.path === '/api/requestResult') {
        const { url } = req.query
        const result = requestResult(url)
        return result.then(data => {
            return data
        })
    }
}

module.exports = handleRequestRouter
