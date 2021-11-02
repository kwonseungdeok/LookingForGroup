var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="/">LookingForGroup</a></h1>
        ${list}
        ${control}        
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
    if(pathname === '/'){
        if(queryData.id === undefined){            
            fs.readdir('./data', function(err, filelist){
                var title = 'Welcome LookingForGroup';
                var description = 'Hello';  
                var list = templateLIST(filelist);
                var template = templateHTML(title, list, 
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`)
                response.writeHead(200);
                response.end(template);
            });            
        } else {
            fs.readdir('./data', function(err, filelist){ 
                fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){  
                    var title = queryData.id;
                    var list = templateLIST(filelist);      
                    var template = templateHTML(title, list, 
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a> 
                         <a href="/update?id=${title}">update</a>
                         <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                         </form>  
                         `)
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }        
    } else if(pathname === '/create'){
        fs.readdir('./data', function(err, filelist){
            var title = 'LookingForGroup - create';
            var list = templateLIST(filelist);
            var template = templateHTML(title, list, `
            <form action ="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`,
            ``
            )
            response.writeHead(200);
            response.end(template);
        });
    }else if(pathname === '/create_process'){        
        var body = '';
        request.on('data',function(data){
            //data가 많을 경우를 대비해 수신한 정보를 주기로 약속
            body += data;
            if(body.length > 1e6)
                request.destroy();
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`,description,'utf8',function(err){                
                //파일을 저장하고나면 내가 쓴글을 본다.(view 페이지로 이동) 리다이렉션
                response.writeHead(302, {Location: `/?id=${title}`});//200 성공 302 리다이렉션해라
                response.end();
            });
        });
    } else if(pathname === '/update'){
        fs.readdir('./data', function(err, filelist){ 
            fs.readFile(`data/${queryData.id}`,'utf8',function(err, description){ 
                var title = queryData.id; 
                var list = templateLIST(filelist);
                //수정할 때 키값을 숨김. <input type = "hidden">
                var template = templateHTML(title, list, 
                    `
                    <form action ="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `,
                    `<a href="/create">create</a> <a href="/update/?id=${title}">update</a>`)
                response.writeHead(200);
                response.end(template);
            });
        });
    } else if (pathname === '/update_process'){
        var body = '';
        request.on('data',function(data){
            //data가 많을 경우를 대비해 수신한 정보를 주기로 약속
            body += data;
            if(body.length > 1e6)
                request.destroy();
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            
            fs.rename(`data/${id}`,`data/${title}`,function(err){
                fs.writeFile(`data/${title}`,`${description}`,'utf8',function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});//200 성공 302 리다이렉션해라
                    response.end();
                })
            });
        });
    } else if (pathname === '/delete_process'){
        var body = '';
        request.on('data',function(data){
            //data가 많을 경우를 대비해 수신한 정보를 주기로 약속
            body += data;
            if(body.length > 1e6)
                request.destroy();
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end('Not found');
    }    
});
app.listen(3000);