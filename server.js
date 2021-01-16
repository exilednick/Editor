const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser')
const spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
let cnt = 0;

let mappings = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app.post('/data', (req, res) => {
  let resp = {};

  if(!(req.body.hash in mappings))
    cnt+=1;
  mappings[req.body.hash] = cnt;

  fs.writeFile(`input${cnt}.txt`, req.body.input, err => {
    if(err)
      return;
  });

  fs.writeFile(`script${cnt}.py`, req.body.text, () => {

    const input = fs.openSync(`./input${cnt}.txt`, 'r');
    
    const process = spawn('python3', [
      `./script${cnt}.py`], {
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
  let num = mappings[req.query.hash];
  res.download(`script${num}.py`);
});

app.listen(process.env.PORT || 3000);