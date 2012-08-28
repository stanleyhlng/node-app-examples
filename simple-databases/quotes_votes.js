var mongo = require('mongodb'),
    server = new mongo.Server('localhost', 27017),
    client = new mongo.Db('quotes', server),
    params = {
        id: process.argv[2],
        voter: process.argv[3]
    };

client.open(function(err, client) {
    if (err) {
        throw err;
    }    

    var collection = new mongo.Collection(client, 'quotes');
    collection.find().each(function(err, doc) {
        if (err) {
            throw err;
        }
        if (doc) {
            console.log(doc._id, doc.quote);
            return;
            client.close();
        }
    });

    if (params.id) {
        collection.update({
            _id: new mongo.ObjectID(params.id)
        },
        {
            $inc: {
                votes: 1
            }
        },
        {
            safe: true
        },
        function(err) {
            if (err) {
                throw err;
            }
            collection.find().sort({votes: -1}).limit(10).each(function(err, doc) {
                if (err) {
                    throw err;
                }
                if (doc) {
                    var votes = (doc.votes) || 0;
                    console.log(doc.author, doc.quote, votes);
                    return;
                }
                client.close();
            });
        });
        return;
    }

});
