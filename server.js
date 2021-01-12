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
  let resp = {};
  fs.writeFile('script.py', req.body.text, () => {
    const process = spawn('python3', [
      "./script.py"]
    )
    process.stdout.on('data', (data) => {
      resp['data'] = data.toString();
    });
    process.stderr.on('data', (data) => {
      resp['error'] = data.toString();
    });
    process.on('close', (code) => {
      resp['code'] = code;
      res.send(resp);
    })
  })
})

app.listen(process.env.PORT || 3000);


