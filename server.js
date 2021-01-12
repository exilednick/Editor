const app = require('express')();

const io = require('socket.io').listen(server);
const fs = require('fs')
const bodyParser = require('body-parser')

const socketRouter = require('./socketRoute')

app.use(bodyParser.urlencoded({extended : true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log(req.body)
  app.post('/submit',(request,response)=>{
    console.log(request.query)
  })
//   fs.writeFile('script.py',`hi
// hello`,(err,file)=>{
//       if(err){
//           console.log(err)
//           res.send(err)
//       }
//       res.send(file)
//   })
})
app.listen(process.env.PORT || 3000)

// io.on('connection', (socket) => {
//   console.log("connected");
// })
//app.use('/',socketRouter)


