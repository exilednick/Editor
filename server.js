const app = require('express')();
const fs = require('fs')
const bodyParser = require('body-parser')
const spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app.post('/data', (req, res) => {
    fs.writeFile('script.py', req.body.text)
    .then(() => {
      const process = spwan("python3", [
        "script.py"
      ])
      process.stdout.on('data', (data) => {
        return data
      })
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
})

app.listen(process.env.PORT || 3000);


