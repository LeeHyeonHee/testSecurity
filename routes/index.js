var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', (req, res, next) => {
  const res_type = 'code';
  const redirect_uri = 'http://localhost:30003/token';
  const cid = '8rr8R0BKFZqVlWTx8pIy';
  const state = 'CA978112CA1BBDCAFAC231B39A23DC4DA786EFF8147C4E72B9807785AFEE48BB';
  const url = 'http://10.0.3.188:30000/oauth2.0/authorize?response_type=' + res_type + '&redirect_uri=' + redirect_uri + '&state=' + state + '&client_id=' + cid;

  res.redirect(url);
});

router.get('/token', (req, res, next) => {
  const grantType = 'authorization_code';
  const authCode = req.query.code;
  const redirectUri = 'http://localhost:30003/token'
  const cid = '8rr8R0BKFZqVlWTx8pIy';
  const csec = 'c17iksUFOIUCKuIB6KWmUySdKvLubEkg';

  const options = {
    uri: 'http://10.0.3.188:30000/oauth2.0/token',
    method: 'POST',
    form: {
      grant_type: grantType,
      code: authCode,
      redirect_uri: redirectUri,
      client_id: cid,
      client_secret: csec
    }
  };

  request.post(options, (err, response, body) => {
    console.log(body);

    const parseJSON = JSON.parse(body);
    res.render('index');
  })
})

module.exports = router;