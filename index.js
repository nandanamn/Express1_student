const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const port = 4500;
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student'
})
app.set('view engine','ejs');
app.set('views',__dirname+'/template');
app.use(bodyParser.urlencoded({extended:true}));

router.get('/student_form',(req,res) =>{
    const selquery = "select * from student_data";
    connection.query(selquery,(err,rows,fields) =>{
        console.log("Rows:",rows)
        res.render('add_data',{ rows });
    });
});


router.post('/update_data',(req,res) =>{
    //  res.send('data resived');
    var name = req.body.txt_name;
    var cls = req.body.txt_class;
    var stream = req.body.txt_stream;
    var mark = req.body.txt_mark;
    var grade = req.body.txt_grade;
    var id = req.body.txt_id;
    // connection.connect()
    strquery = "  UPDATE student_data SET name='" + name +"', class='" + cls +"', mark='" + mark +"', stream='" + stream +"', grade='" + grade +"' WHERE student_id="+id;
    connection.query(strquery, (err, rows, fields) => {
        // if (err) throw err
      
        // console.log('The solution is: ', rows[0].solution);
        res.redirect('/student_form');
      });
      
    //   connection.end()
    
    // res.send("Name:" +name+ "  "+"Class:"+ cls+"  "+"Stream:" + stream +"  "+ "Mark:"+ mark+"  "+" grade:" + grade);
    });
    router.post('/submit_data', (req,res) =>{
        
        res.send(mark);
    });



// router.get('/',(req,res) => {
//     res.send('Hello world!')
// });

// router.get('/student_form',(req,res) =>{
// res.render('add_data');
// });
/*

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

connection.end()

*/   



router.post('/submit_data',(req,res) =>{
 //  res.send('data resived');
 var name = req.body.txt_name;
 var cls = req.body.txt_class;
 var stream = req.body.txt_stream;
 var mark = req.body.txt_mark;
 var grade = req.body.txt_grade;
 
 // connection.connect()
 strquery = "insert into student_data(name,class,mark,stream,grade) values('"+name+"','"+cls+"',"+mark+",'"+stream+"','"+grade+"')";
 connection.query(strquery, (err, rows, fields) => {
     // if (err) throw err
   
     // console.log('The solution is: ', rows[0].solution);
     res.redirect('/student_form');
   });
   
 //   connection.end()
 
 // res.send("Name:" +name+ "  "+"Class:"+ cls+"  "+"Stream:" + stream +"  "+ "Mark:"+ mark+"  "+" grade:" + grade);
 });
 router.post('/submit_data', (req,res) =>{
     
     res.send(mark);
 });




router.get('/delete_student',(req,res) =>{
    var id = req.query.id;
   delquery = "DELETE from student_data WHERE student_id ="+id;
    // res.send("delete request got"+req.query.id);
    connection.query(delquery, (err, rows, fields) => {
        res.redirect('/student_form');
    });
});
 

router.get('/update_student',(req,res) =>{
    const id = req.query.id;
    selquery= "SELECT * from student_data WHERE student_id="+id;
    connection.query(selquery, (err, rows, fields) => {
        res.render('update',{ rows });
    });
   
});



// router.get('/update_student',(req,res) => {
//     const id = req.query.id;

// })

router.get('/',(req,res) => {
    var data = {title:'student data',student_data:[{
        name : 'Arun', 
        class : 'Plus one',
        stream : 'science',
        mark : 90,
        grade : 'A plus'
    },
    {
        name : 'Anu',
        class : 'Plus one',
        stream : 'science',
        mark : 80,
        grade : 'B plus'
    },
    {
        name : 'Bindhu',
        class : 'Plus one',
        stream : 'science',
        mark : 91,
        grade : 'A '
    },
    {
        name : 'Mini',
        class : 'Plus one',
        stream : 'science',
        mark : 95,
        grade : 'A plus'
    },
    {
        name : 'Vinsha',
        class : 'Plus one',
        stream : 'science',
        mark : 99,
        grade : 'A plus'
    },
    {
        name : 'Nayana',
        class : 'Plus one',
        stream : 'science',
        mark : 87,
        grade : ' A'
    },
    {
        name : 'Fidha',
        class : 'Plus one',
        stream : 'science',
        mark : 75,
        grade : 'B'
    },
    {
        name : 'Shiji',
        class : 'Plus one',
        stream : 'science',
        mark : 91,
        grade : 'A plus'
    },
    {
        name : 'Vibin',
        class : 'Plus one',
        stream : 'science',
        mark : 95,
        grade : 'A plus'
    },
    {
        name : 'Amal',
        class : 'Plus one',
        stream : 'science',
        mark : 70,
        grade : 'c plus'
    }]};
    res.render('index',data);
});

app.use(express.static(__dirname+'/public'));
app.use('/',router);
app.listen(port,() => console.log('server is runing'));
