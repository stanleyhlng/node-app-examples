node-app-examples
=================

This repo holds several node application samples

## Codes

### /simple-web-server
 * setting up a router

```
[stanleyn@triesmanner-lm] ~ $ hotnode app-route.js
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
Woohoo!
```
```
[stanleyn@triesmanner-lm] ~ $ hotnode app-route-path.js
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
Woohoo!
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/about
A simple routing with Node example
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/another%20page
Here's another page
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/not_found
Page Not Found!
```
```
[stanleyn@triesmanner-lm] ~ $ hotnode app-route-multilevel.js 
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/about/this
Multilevel routing with Node
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/about/node
Evented I/O for V8 JavaScript
```
```
[stanleyn@triesmanner-lm] ~ $ hotnode app-route-querystring.js
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/?id=1
Woohoo!
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/?id=2
A simple routing with Node example
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/?id=3
Here's /another page
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/?id=4
Page Not Found!

--------------------------------------------------
{ search: '?id=1',
  query: { id: '1' },
  pathname: '/',
  path: '/?id=1',
  href: '/?id=1' }
--------------------------------------------------  
```

 * serving static files

```
[stanleyn@triesmanner-lm] ~ $ hotnode app-static.js 
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
<html>
<head>
<title>Yay Node!</title>
<link rel="stylesheet" href="styles.css" type="text/css">
…
</html>
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/script.js
window.onload=function() {alert('Yay Node!');};
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/styles.css
#yay {font-size:5em;background:blue;color:yellow;padding:0.5em}
```

 * caching files in memory

```
[stanleyn@triesmanner-lm] ~ $ hotnode app-static-cache.js 
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
--------------------------------------------------  
loading content/index.html from disk
loading content/index.html from cache
``` 
 
 * streaming large files from disk via HTTP

```
[stanleyn@triesmanner-lm] ~ $ curl -i http://localhost:8080/
HTTP/1.1 200 OK
Content-type: text/html
Date: Fri, 17 Aug 2012 07:49:21 GMT
Connection: keep-alive
Transfer-Encoding: chunked

<html>
<head>
<title>Yay Node!</title>
<link rel=stylesheet href=styles.css type=text/css>
...

--------------------------------------------------

piping content/index.html
stats.size=200
streaming content/index.html offset=0
object
streaming content/index.html offset=10
object
streaming content/index.html offset=20
object
streaming content/index.html offset=30
...
```

 * securing web server

```
[stanleyn@triesmanner-lm] ~ $ curl -i http://localhost:8080/../package.json
HTTP/1.1 200 OK
Date: Fri, 17 Aug 2012 08:11:10 GMT
Connection: keep-alive
Transfer-Encoding: chunked

{
  "name": "simple-web-server",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "hotnode app"
  },
  "dependencies": {
    "hotnode": "0.0.6"
  }
}

--------------------------------------------------
hotnode: node process restarted
content/../package.json
```
	
### /simple-http
### /simple-data-serialization
### /simple-databases
### /simple-web-sockets
### /simple-express
### /simple-security
### /simple-networking
### /simple-node-module

## Notes