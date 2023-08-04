// import fetch from 'isomorphic-fetch'

//baseUrl 变量初始化为 API 服务器的 URL
const baseUrl = "http://192.168.110.250:4002"

function myFetch(url, options = {}) {
  options.method = options.method || 'get';

  if (options.method.toUpperCase() === 'POST') {
    // 如果是 POST 方法，将请求头的 Content-Type 设置为 application/json
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json'
    };
  }

  // 如果有数据需要携带，在 options 对象中设置 body 属性
  if (options.data) {
    options.body = JSON.stringify(options.data);
  }

  return fetch(baseUrl + url, options)
    .then(res => {
      if(res.status === 200 || res.status === 304) {
        return res.json();
      } else throw new Error(res.statusText);
    })
    .then(res => {
      switch(res.code) {
        case 0: return res.data;
        case 199:
        case 404:
        case 401:
        case 500:
        default: 
          throw new Error(res.msg);
      }
    })
    .catch(e => {
      console.log(e.message);
      return Promise.reject(e.message);
    });
}

export default myFetch;
