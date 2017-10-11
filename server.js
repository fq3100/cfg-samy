var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var SENSOREN_COLLECTION = "sensoren";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// SENSOREN API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/sensoren"
 *    GET: finds all sensoren
 *    POST: creates a new sensor
 */

app.get("/api/sensoren", function(req, res) {
  db.collection(SENSOREN_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get sensoren.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/sensoren", function(req, res) {
  var newSensor = req.body;
  newSensor.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(SENSOREN_COLLECTION).insertOne(newSensor, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new sensor.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/sensoren/:id"
 *    GET: find sensor by id
 *    PUT: update sensor by id
 *    DELETE: deletes sensor by id
 */

app.get("/api/sensoren/:id", function(req, res) {
  db.collection(SENSOREN_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/sensoren/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(SENSOREN_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/sensoren/:id", function(req, res) {
  db.collection(SENSOREN_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete sensor");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
