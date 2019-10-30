'use strict'

var MongoClient = require('mongodb').MongoClient;
const request = require("request");

let cachedDb = null;
let API_ENDPOINT = "https://api.worldtradingdata.com/api/v1/stock";
let API_TOKEN = process.env.API_TOKEN;

const params = {
    symbol: "AAPL,MSFT",
    api_token: API_TOKEN
}

exports.handler = (event, context, callback) => {
    var uri = process.env['MONGODB_ATLAS_CLUSTER_URI'];
    
    if (atlas_connection_uri != null) {
    } 
    else {
        atlas_connection_uri = uri;
        console.log('the Atlas connection string is ' + atlas_connection_uri);
    } 
    request({url: API_ENDPOINT, qs: params}, (err, res, body) => {
        if (err) { return err; }
        console.log("Received response from API:");
        console.log(body);
        return processMarketData(body, context, callback);
    });
};

function processMarketData(marketData, context, callback) {
  //the following line is critical for performance reasons to allow re-use of database connections across calls to this Lambda function and avoid closing the database connection. The first call to this lambda function takes about 5 seconds to complete, while subsequent, close calls will only take a few hundred milliseconds.
  context.callbackWaitsForEmptyEventLoop = false;
  
  var jsonContents = formatApiData(JSON.parse(marketData));
  try {
      if (cachedDb == null) {
          console.log('=> connecting to database:');
          MongoClient.connect(atlas_connection_uri, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
              if (err) throw err;
              cachedDb = client.db('stock-prices');
              return createDoc(cachedDb, jsonContents, callback);
          });
      }
      else {
          console.log("using cached connection to db");
          createDoc(cachedDb, jsonContents, callback);
      }
  }
  catch (err) {
      console.error('an error occurred', err);
  }
}

function createDoc (db, json, callback) {
    let itemsProcessed = 0;
    json.forEach(data_point => {
        db.collection(data_point.symbol).insertOne(data_point, function(err, result) {
            if(err!=null) {
                console.error("an error occurred in createDoc", err);
                callback(null, JSON.stringify(err));
            }
            else {
                itemsProcessed++;
                console.log("record created with id:" + result.insertedId);
            }
            if (itemsProcessed == json.length) {
                callback(null, "SUCCESS");
            }
        });
    })
};

function formatApiData(jsonContents) {
    let data = jsonContents.data
    return data.map(data_point => ({
            symbol: data_point.symbol,
            currency: data_point.currency,
            price: data_point.price,
            stock_exchange_long: data_point.stock_exchange_long,
            stock_exchange_short: data_point.stock_exchange_short,
            market_cap: data_point.market_cap,
            volume: data_point.volume,
            timezone: data_point.timezone,
            last_trade_time: data_point.last_trade_time
        })
    );
}