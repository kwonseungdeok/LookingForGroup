var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
    return `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${body}
    </body>
    </html>
    `
}
function templateLIST(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i = i + 1;
    }
    list = list + '</ul>'
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url; // /?id=~~~
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
        if(title === undefined){            
            fs.readdir('./data', function(err, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';  
                var list = templateLIST(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
                response.writeHead(200);
                response.end(template);
            });            
        } else {
            fs.readdir('./data', function(err, filelist){ 
                fs.readFile(`data/${title}`,'utf8',function(err, description){  
                    var list = templateLIST(filelist);      
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`)
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }        
    } else {
        response.writeHead(404);
        response.end('Not found');
    }    
});
app.listen(3000);