const http = require('http')
const handleRequestRouter = require('./src/router/requestResult')
const querystring = require('querystring')

function getPostData(req) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''

        req.on('data', chunk => {
            postData += chunk
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }

            resolve(JSON.parse(postData))
        })
    })
}

const handleRouter = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''

    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }

        const part = item.split('=')
        const key = part[0]
        const val = part[1]
        req.cookie[key] = val
    })

    getPostData(req).then((postData) => {
        req.body = postData

        const requestResult = handleRequestRouter(req, res)
        if (requestResult) {
            requestResult.then(data => {
                res.setHeader('Content-type', 'text/html;charset=utf8')
                res.end(data)
            })
            return
        }

        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.end('404 Not Found')
    })
}

module.exports = handleRouter
