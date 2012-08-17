node-app-examples
=================

This repo holds several node application samples

## Codes

### /simple-web-server
 * setting up a router

```
[stanleyn@triesmanner-lm] ~ $ hotnode app-router.js
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
Woohoo!
```

 * serving dynamic and static content
 
 ```
[stanleyn@triesmanner-lm] ~ $ hotnode app-router-path.js
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/
Woohoo!
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/about
A simple routing with Node example
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/another%20page
Here's another page
[stanleyn@triesmanner-lm] ~ $ curl http://localhost:8080/not_found
Page Not Found!
 ```
 
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