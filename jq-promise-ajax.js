//与上一个ajax相比多了一个promise规则
//这个是满足promise规则的ajax封装

window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.html = function () { }
    return nodes
}
window.$ = window.jQuery

window.Promise = function (fn) {
    // ...
    return {
        then: function () { }
    }
}

window.jQuery.ajax = function ({ url, method, body, headers }) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest()
        request.open(method, url) // 配置request
        for (let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value)
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                } else if (request.status >= 400) {
                    reject.call(undefined, request)
                }
            }
        }
        request.send(body)
    })
}

myButton.addEventListener('click', (e) => {
    let promise = window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        }
    })

    //promise是return的Promise对象， 对象中有then() ,对象可以直接调用
    promise.then(
        (text) => { console.log(text) },
        (request) => { console.log(request) }
    )

})
