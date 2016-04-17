var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all todos in the database
        getFoods(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/foods', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            text: req.body.text,
            name: req.body.name,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFoods(res);
        });

    });

    // delete a todo
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    //total price

    app.get('/api/total', function(req, res){

         Food.find(function (err, foods) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            var total = 0;
            for(var i in foods){
                total += foods[i].price;
            }
            total = total * 107.5/100;
            res.json({'total':total}); // return all todos in JSON format
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};