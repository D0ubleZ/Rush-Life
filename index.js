const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var google = require("googleapis");//new
const app = express();


const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// local console
// var pool = new Pool({
//   user: 'postgres',
//   password: 'root',
//   host: 'localhost',
//   database: 'postgres'
// });

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')





app.get('/login_wrong',function(req,res) {
  res.redirect('loginwrong.html')
})



app.post('/login',function(req,result) {
  pool.connect(function(err,client,release){

    if(err)
        throw err;
    var name = req.body.email
    var psw = req.body.psw
    sql = {
      text: 'SELECT * from customers where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();
      // console.log(res);
      console.log(res.rowCount);
      if (res.rowCount == 0) {
        result.redirect('/login_wrong')
      }
      else if(err){
        throw err;
      }
      else if(res.rows[0].password != psw){

        result.redirect('/login_wrong')
        console.log('The password does match to the username');
        // alert('The password does match to the username')
      }
      else{
        if(res.rows[0].password == 'admin'){

          result.redirect('/display_all')
        }
        else {
          result.redirect('user.html');
        }
      }
    })
  });
})

// app.get('/sign',function(req,res) {
//   res.redirect(signup.html)
// })
app.get('/display_all',function(req,res) {
pool.connect(function(err, client, release){
    if(err)
        throw err;

    var query = "select * from customers";

    pool.query(query,function(err,result){
      release();
        if(err)
            throw err;
        else {
            release();
            res.render('pages/db.ejs', { customers: result });
        }
    });
});
})

app.get('/display_all_error',function(req,res) {
pool.connect(function(err,client,release){
    if(err)
        throw err;

    var query = "select * from customers";

    pool.query(query,function(err,result){
      release();
        if(err)
            throw err;
        else {

             res.render('pages/db_delete_test.ejs', { customers: result });
        }
    });
});
})

app.post('/userinfo',function(req,result){
  pool.connect(function(err,client,release){
    if(err)
        throw err;
    var name = req.body.name

    sql = {
      text: 'SELECT * from customers where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();

      if(err){
        throw err;
      }

      else{
          result.render('pages/user_you.ejs', { customers: res });
      }
    })
  });
})


app.post('/information',function(req,result){
  pool.connect(function(err,client,release){
    if(err)
        throw err;
    var name = req.body.name
    sql = {
      text: 'SELECT * from customers where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();

      if(err){
        throw err;
      }

      else{
          result.render('pages/userinfo.ejs', { customers: res });
      }
    })
  });
})









app.post('/sign_up',function(req,res) {


  var name = req.body.name;
  var password = req.body.psw;


  pool.connect(function(error,client,release) {


//add customers into table console
    const query = {
      text: 'INSERT INTO customers VALUES($1, $2)',
      //form data
      values: [req.body.name,req.body.psw],
    }

    pool.query(query, (err, res) => {
      release();
      if (err) {
        console.log(err.stack)
      } else {
        console.log("success")
      }
    })
  });
  //go back
  res.redirect('iter1_Rick.html')
})
app.post('/update',function(req,result) {
  var name = req.body.name;
  var swim_t = req.body.swim;
  var running_t =req.body.aerobic_running;
  var mountaineering_t = req.body.mountaineering;
  var cycling_t = req.body.cycling_sport;
  var ball_t = req.body.ball_games;
  var gym_t =req.body.gym_exercise;
  var porkkg = req.body.porkkg;
  var fishkg = req.body.fishkg;
  var chickenkg = req.body.chickenkg;
  var eggkg = req.body.eggkg;
  var ricekg = req.body.ricekg;
  var noodlekg = req.body.noodlekg;
  const sql ={
    text: 'INSERT INTO seven_day VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
    values: [name,'1',swim_t,running_t,mountaineering_t,cycling_t,ball_t,gym_t,porkkg,fishkg,chickenkg,eggkg,ricekg,noodlekg]
  }
  pool.query(sql, (err, res) => {
    release();
    if (err) {
      console.log(err.stack)
    } else {
      const sql ={
        text: 'select * FROM seven_day WHERE name = $1',
        values: [name]
      }
      pool.query(sql,function(err,res2){
        release();

        if(err){
          throw err;
        }
        else{
            result.render('pages/userinfo.ejs', { customers: res2 });
        }
      })


    }
  })

})

app.post('/graph',function(req,res) {
  pool.connect(function(err,client,release){
    if(err)
        throw err;
    var name = req.body.name
    sql = {
      text: 'SELECT * from seven_day WHERE Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,result){
      release();

      if(err){
        throw err;
      }
      else{
        console.log(result);
          res.render('pages/graph.ejs',{ customers: result });
      }
    })
  });
})

app.post('/userinformation',function(req,res) {
  res.redirect('user.html')
// pool.connect(function(err,client,release){
//     if(err)
//         throw err;
//
//     var query = "select * from customers";
//
//     pool.query(query,function(err,result){
release();
//         if(err)
//             throw err;
//         else {
//           console.log(result);
//              res.render('pages/db.ejs', { customers: result });
//         }
//     });
// });
})


app.post('/user_research',function(req,res) {
  pool.connect(function(err,client,release){

    var name = req.body.name;
    var age = req.body.age;
    var gender=req.body.gender ;
    var height=req.body.height ;
    var weight=req.body.weight ;
    var food=req.body.food ;
    var fat_percent=req.body.fat_percent ;
    var time = req.body.time;

    if(err)
        throw err;
    //UPDATE weight
    if (!age) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET age = $1 WHERE name = $2",
      values: [age,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit age by name");
        }
      })
    }

    if (!gender) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET gender = $1 WHERE name = $2",
      values: [gender,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit gender by name");
        }
      })
    }


    if (!height) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET height = $1 WHERE name = $2",
      values: [height,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit height by name");
        }
      })
    }

    if (!weight) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET weight = $1 WHERE name = $2",
      values: [weight,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit weight by name");
        }
      })
    }

    if (!food) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET food = $1 WHERE name = $2",
      values: [food,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit food by name");
        }
      })
    }


    if (!fat_percent) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET fat_percent = $1 WHERE name = $2",
      values: [fat_percent,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit fat_percent by name");
        }
      })
    }


    if (!time) {
      console.log("body not changed");
    }
    else {
      const query = {
      text : "UPDATE customers SET time = $1 WHERE name = $2",
      values: [time,name],
      }
      //callback
      pool.query(query, (err, res) => {
        release();
        if (err) {
          console.log("no match");
        } else {
          console.log("success edit fat_percent by name");
        }
      })
    }


  })



  res.redirect('login.html')

  // pool.connect(function(err,client,release){
  //   if(err)
  //       throw err;
  //   var name = req.body.name
  //   console.log(name);
  //   sql = {
  //     text: 'SELECT * from customers where Name = $1',
  //     values: [name]
  //   }
  //   pool.query(sql,function(err,res){


  //     console.log(res);
  //     if(err){
  //       throw err;
  //     }
  //
  //     else{
  //         result.render('pages/user_you.ejs', { customers: res });
  //     }
  //   })
  // });



})
app.get('/back1',function(req,res) {
  res.redirect('login.html')
})
app.get('/back2',function(req,res) {
  res.redirect('user.html')
})
app.post('/delete', (req,res) => {
      pool.connect(function(err,client,release) {
      if (err) throw err;
      const sql = {text:"DELETE FROM customers WHERE name= $1",
                  values:[req.body.name]};
      pool.query(sql, function (err, result) {
        release();
        if (err) throw err;
        if(result.rowCount==0){
          res.redirect('display_all_error');
        }
        else {
          res.redirect('display_all');
        }
      });
    });
});
app.post('/back',function(req,result) {
  pool.connect(function(err,client,release){
    if(err)
        throw err;
    var name = req.body.name
    var psw = req.body.password
    sql = {
      text: 'SELECT * from customers where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();


      if(err){
        throw err;
      }
      else if(res.rows[0].password != psw){
        console.log('The password does match to the username');
        // alert('The password does match to the username')
      }
      else{
          result.redirect('user.html');
      }
    })
  });
})

app.post('/back_info',function(req,result) {
  pool.connect(function(err,client,release){
    if(err)
        throw err;
    var name = req.body.name
    sql = {
      text: 'SELECT * from seven_day where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();

      if(err){
        throw err;
      }
      else{
          result.render('pages/userinfo.ejs',{ customers: res });
      }
    })
  });
})

app.post('/calendar',function(req,result){
  pool.connect(function(err,client,release){
    if(err)
      throw err;
    var name = req.body.name


    sql = {
      text: 'SELECT * from customers where Name = $1',
      values: [name]
    }
    pool.query(sql,function(err,res){
      release();
      if(err){
        throw err;
      }
      else {
        result.render('pages/calendar.ejs', { customers: res });
      }
    })
  })
})

app.post('/check_in',function(req,result){
  pool.connect(function(err,client,release){
    if(err)
      throw err;
    var name = req.body.name;

    var current_time =req.body.current_time;
    var current_time = parseInt(current_time);
    var new_time = current_time + 1;
    var new_time = new_time.toString();

    sql = {
      text: 'UPDATE customers SET time = $1 WHERE Name = $2',
      values: [new_time,name],
    }
    pool.query(sql,function(err,res){
      release();
      if(err){
        throw err;
      }
      else {
        // console.log("success render");
        // console.log(res);
        sql = {
          text: 'SELECT * from customers where Name = $1',
          values: [name]
        }
        pool.query(sql,function(err,res2){
          release();
          if(err){
            throw err;
          }
          else {
            result.render('pages/calendar_success.ejs', { customers: res2 });
          }
        })
      }
    })
  })
})


app.post('/calendar_back',function(req,result){
  result.redirect('user.html');
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
