var express = require('express');
var cors = require('cors');
var mysql = require('mysql2');

var app = express();
const dbconn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'testdb'
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(3000, ()=>{
    console.log("Listien on port 3000 ...");
});

app.get('/', (req, res)=>{
    console.log("Hello from node server");
    res.send("Hello from node server");
});

app.get('/persons', (req, res)=>{
    dbconn.query('SELECT * FROM Persons', (err, result)=>{
        if(err) throw err;
        res.json(result);
    })
});

app.get('/person/:id', (req, res)=>{
    let id = req.params.id;
    dbconn.query('select * from Persons where PersonID = ?', id, (err, result)=>{
        if(err) throw err;
        res.json(result);
    });
});

app.post('/person', (req, res)=>{
    //console.log(req.body.Lastname + "/" + req.body.Firstname);
    let person = {
        Lastname: req.body.Lastname,
        Firstname: req.body.Firstname,
        Address: req.body.Address,
        City: req.body.City
    };
    dbconn.query('insert into Persons set ?', person, (err, result)=>{
        if(err) throw err;
        res.json(result);
    })
});

//rest api to delete record from mysql database

app.delete('/person/:id',(req,res)=>{

    //console.log(req.params.id);

    let id = req.params.id;

    connection.query('DELETE FROM Persons WHERE PersonID =?',id, (error, results) => {

     if (error) throw error;

     res.end('Record has been deleted!');

   });
});