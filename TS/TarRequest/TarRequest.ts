export default function TarRequest(method: string, url: string, value: any, callback: (obj: any) => void ) {
    var httpRequest: any = new XMLHttpRequest()
    var obj: undefined = undefined
    if (value) {
    	var strArr: string[] = [];
    	var str: string = ''
    	Object.keys(value).forEach((key) => {
    		var name = key
    		var va = value[key]
    		strArr.push(name + '=' + va)
    		str = strArr.join('&')
    	})
    } else {
    	str = ''
    }
	if (method.toUpperCase() === 'GET') {
		if (value) {
			str = '?' + str
		}
        httpRequest.open(method, url + str, true)
        httpRequest.send()
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                obj = JSON.parse(httpRequest.responseText);
                if (callback) callback(obj)
            }
        }
		httpRequest.addEventListener('error', transferFailed);
		function transferFailed() {
			if (callback) callback('数据接收出错')
		}
    } else if (method.toUpperCase() === 'POST') {
        httpRequest.open(method, url, true)
		httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.send(str)
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                obj = JSON.parse(httpRequest.responseText);
                if (callback) callback(obj)
            }
        }
        httpRequest.addEventListener('error', transferFailed);
        function transferFailed() {
        	if (callback) callback('数据接收出错')
        }
    }
}