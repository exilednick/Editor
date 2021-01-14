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

  fs.writeFile('input.txt', req.body.input, err => {
    if(err)
      return;
  });

  fs.writeFile('script.py', req.body.text, () => {

    const input = fs.openSync('./input.txt', 'r');
    
    const process = spawn('python3', [
      "./script.py"], {
        stdio: [input, 'pipe', 'pipe']
      }
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

app.get('/download', (req, res) => {
  res.download('script.py');
});

app.listen(process.env.PORT || 3000);


