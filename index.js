const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// app.listen(8080, function() {
//     console.log('listening on 8080')
// });

var db;

MongoClient.connect('mongodb://localhost:27017/local', function (err, client) {
    if (err) 
        return console.log(err);
    
    db = client.db('local');

    // db.collection('post').insertOne({
    //     이름: 'John',
    //     _id: 100
    // }, function (에러, 결과) {
    //     console.log('저장완료');
    // });

    app.listen(3000, function () {
        console.log('listening on 8080');
    });
});

app.get('/', function(req, res) { 
    // res.send('펫용품 사시오');
    res.sendFile(__dirname + "/index.html");
});

app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html');
});

app.post('/add', function(req, res){
  console.log("request : " + req.body);  

  db.collection('counter').findOne({name : 'count'}, function(err, result){
    var totalPost = result.totalCount;
    db.collection('post').insertOne( { _id : (totalPost + 1), 제목 : req.body.title, 날짜 : req.body.date } , function(){
        console.log('저장완료');
        alert("저장완료");
        // res.sendFile(__dirname +'/write.html');    
    });
  });
  
//   db.collection('post').insertOne( { 제목 : req.body.title, 날짜 : req.body.date } , function() {
//     console.log('저장완료');
//   });
});


app.get('/list', function(req, res) {
    db.collection('post').find().toArray(function(err, result){
        if(err) {
            console.log("err");
        }
        console.log("result" + result);
        res.render('list.ejs', { posts : result });
    });    
});




