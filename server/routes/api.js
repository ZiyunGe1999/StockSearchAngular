var express = require('express')
var router = express.Router();
var axios = require('axios');
const querystring = require('querystring');
// const { query } = require('@angular/animations');

var token = "c87v1q2ad3iet0qj41mg";
var finnhubAPI = "https://finnhub.io/api/v1";

// router.get('/', (req, res) => {
//   return res.send("Stock Search API");
// })

router.get('/*/*', async (req, res)=>{
    const url = req.url;
    console.log(url);
    const method = req.method;
    const info = querystring.parse(url.split('?')[1])
    var request_url = `${finnhubAPI}${url}&token=${token}`;
    console.log(request_url);
    if (method === 'GET') {
        axios.get(request_url).then(posts=>{
            res.status(200).json(posts.data);
        })
        .catch(error=>{
            res.status(500).send(error);
        })
        return;
    }
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('404 Not Found\n')
    res.end()    
});

router.get('/*', async (req, res)=>{
    const url = req.url;
    console.log(url);
    const method = req.method;
    const info = querystring.parse(url.split('?')[1])
    var request_url = `${finnhubAPI}${url}&token=${token}`;
    console.log(request_url);
    if (method === 'GET') {
        axios.get(request_url).then(posts=>{
            res.status(200).json(posts.data);
        })
        .catch(error=>{
            res.status(500).send(error);
        })
        return;
    }
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('404 Not Found\n')
    res.end()    
});

module.exports = router;