const express = require('express');
const { poolPromise } = require('./dbconnect');
const app = express();
var router = require('./router/main')(app);
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(41433, function () {
    console.log('listening on 31433')
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

var router = require('./router/main')(app, fs);



// // mssql 연동 -- connectionPool 사용 
// var sql = require('mssql');
// var config = {
//  // 환경변수이용
//     user: process.env.user,
//     password: process.env.password,
//     port: Number(process.env.port),
//     server: process.env.server,
//     database: process.env.database,
//     stream: true,
//     encrypt: false
// }
// sql.connect(config, function(err){
//     if(err){
//         return console.error('error : ', err);
//     }
//     console.log('MSSQL 연결 완료')
// })

app.get('/', (req, res) => {
    res.render('test.html')
});

app.get('/list',async (req, res) => {    
    const pool = await poolPromise;
    const result = await pool.request()
    // //프로시저사용
    // .input('MID','B')
    // .execute('up_erp_STITEM_MIN_SELECT',(err,profileset) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         const send_data = profileset.recordset;
    //         res.render('list.ejs',{'posts' : send_data})
    //     }
    // });
    //쿼리사용
    .query("SELECT * FROM T_SIM_STITEM_MID", (err, profileset) => {
        if(err){
            console.log(err);
        }
        else{
            const send_data = profileset.recordset;
            res.status(200) //.json({ status: "Success" })  
            res.render('list.ejs',{'posts' : send_data});
        }
    });

    //하나씩 읽어드리는 방식
    // var request = await pool.Request();
    // request.stream = true;
    
    // request.execute('up_erp_STITEM_MID_SELECT');
    // var result = [];
    // request.on('error', function(err){
    //     console.log(err); 
    // })
    // .on('row', (row) => {
    //     result.push(row)
    // })
    // .on
    // ('done', () => { // 마지막에 실행되는 부분
    //     //console.log('result :', result)
    //     res.render('list.ejs',{'posts' : result})
    // });
});