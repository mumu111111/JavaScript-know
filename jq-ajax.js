//jQuery虽然有些过时，但是他的思想还是值得学习的。
//实现以下jQuery的 $.ajax()  尽量去还原实现他的功能
//使用语法 
//  $.ajax({
//     url: '/frank',
//     method: 'get',
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         'frank': '18'
//     }
//  })    

window.jQuery = function (nodeOrSelector) {
    let nodes = {}
    nodes.addClass = function () { }
    nodes.html = function () { }
    return nodes  //返回对象及其方法
}
window.$ = window.jQuery

window.jQuery.ajax = function ({ url, method, body, successFn, failFn, headers }) {
    let request = new XMLHttpRequest()  //ajax
    request.open(method, url) // 配置request
    for (let key in headers) {
        let value = headers[key]
        request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                successFn.call(undefined, request.responseText)
            } else if (request.status >= 400) {
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)
}

function f1(responseText) { }
function f2(responseText) { }

myButton.addEventListener('click', (e) => {
    window.jQuery.ajax({
        url: '/frank',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        },
        successFn: (x) => {
            f1.call(undefined, x)
            f2.call(undefined, x)
        },
        failFn: (x) => {
            console.log(x)
            console.log(x.status)
            console.log(x.responseText)
        }
    })
})
