const request = require('request')

const requestResult = (url) => {
    return new Promise((resolve => {
        request.get(url, null, (err, data, body) => {
            const arr = body.match(/(var project = {.+\})/g)
            if (!arr.length) {
                resolve('')
                return
            }
            const jsonStr = arr[0].replace('var project = ', '')
            const obj = JSON.parse(jsonStr)
            let html = ''
            obj['questionpage_list'][0]['question_list'].forEach(item => {
                if (!item.option_list.length) {
                    return
                }
                const h3 = item.title
                let p = []
                let span = []
                item.option_list.forEach(questionItem => {
                    p.push(questionItem.title)
                    if (questionItem.custom_attr.is_correct === '1') {
                        const selectResult = questionItem.title.substring(0, 1)
                        span.push(selectResult)
                    }
                })
                html += `
                   <h3>${h3}</h3>
                   <p>${p.join('&nbsp;&nbsp;&nbsp;&nbsp;')}</p>
                   <p style="color:red;">答案：${span.join('、')}</p>
                `
            })
            resolve(html)
        })
    }))
}

module.exports = { requestResult }
