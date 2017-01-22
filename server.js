var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/'));
/* ----------------- get ------------------ */
app.get('/api/item/:id', function(req, res) {
    var item = {
        "name": 1,
        "price": 2.4,
        "descr": "asdfasdf"
    };
    res.send(JSON.stringify(item));
});

/* ----------------- //get end ------------------ */
/* ----------------- put ------------------ */
app.put('/api/item/:id', function(req, res) {
    res.send('PUT!');
});
/* ----------------- //put end ------------------ */
/* ----------------- get list ------------------ */
app.get('/api/item', function(req, res) {
    var items = [{
        id: 1,
        "name": 1,
        "price": 2.4,
        "descr": "asdfasdf"
    }, {
        id: 2,
        "name": 2,
        "price": 5.5,
        "descr": "descr2"
    }];
    res.send(JSON.stringify(items));
});


/* ----------------- //get list end------------------ */
/* ----------------- delete ------------------ */
app.delete('/api/item/:id', function(req, res) {
    res.send('DELETE!');
});
/* ----------------- delete end ------------------ */
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});