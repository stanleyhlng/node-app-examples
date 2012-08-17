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
[stanleyn@triesmanner-lm] simple-web-server $ hotnode app-route-multilevel.js 
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

 * serving dynamic and static content


 * caching files in memory
 * streaming large files from disk via HTTP
 * securing web server
	
### /simple-http
### /simple-data-serialization
### /simple-databases
### /simple-web-sockets
### /simple-express
### /simple-security
### /simple-networking
### /simple-node-module

## Notes