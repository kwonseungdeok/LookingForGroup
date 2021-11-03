const express = require('express');
const app = express();

app.listen(31433, function () {
    console.log('listening on 31433')
})

// mssql 연동
var sql = require('mssql');
var config = {
    user: 'sa',
    password: 'rla994869!',
    port: 31433,
    server: 'data.egibiz.co.kr',
    database: 'ERPMEGA',
    stream: true,
    encrypt: false
}

sql.connect(config, function(err){
    if(err){
        return console.error('error : ', err);
    }
    console.log('MSSQL 연결 완료')
})

app.get('/list', (req, res) => {
    var request = new sql.Request();
    request.stream = true;
    
    request.execute('up_erp_STITEM_MID_SELECT');
    var result = [];
    request.on('error', function(err){
        console.log(err); 
    })
    .on('row', (row) => {
        result.push(row)
    })
    .on
    ('done', () => { // 마지막에 실행되는 부분
        //console.log('result :', result)
        res.render('list.ejs',{'posts' : result})
    });
});