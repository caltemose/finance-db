var Q = require('q')

export default class Ajax {
    constructor() {}

    getJSON(url) {
      var xhr = new XMLHttpRequest();
      var d = Q.defer();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  d.resolve(JSON.parse(xhr.responseText));
              } else {
                  d.reject(xhr.responseText);
              }
          }
      };
      xhr.open('GET', url);
      xhr.send();
      return d.promise;
    }

    post (url, data) {
        console.log(data)
        var xhr = new XMLHttpRequest();
        var d = Q.defer();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    d.resolve(JSON.parse(xhr.responseText));
                } else {
                    d.reject(xhr.responseText);
                }
            }
        };
        xhr.open('POST', url)
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        xhr.send(JSON.stringify(data))
        return d.promise;
    }

    put (url, data) {
        console.log(data)
        var xhr = new XMLHttpRequest();
        var d = Q.defer();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    d.resolve(JSON.parse(xhr.responseText));
                } else {
                    d.reject(xhr.responseText);
                }
            }
        };
        xhr.open('PUT', url)
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        xhr.send(JSON.stringify(data))
        return d.promise;
    }
}
