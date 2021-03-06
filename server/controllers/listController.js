const fs = require("fs");
const path = require("path");
const minHeap = require("../models/DSmodel");

const listController = {};
listController.createHeap = (req, res, next) => {
  console.log("Create heap called");
  minHeap.create({ heap: [] }, (err, data) => {
    if (err) return console.log("Create heap failed     ", err);
    console.log("Create heap worked");
    next();
  });
};
listController.getHeap = (req, res, next) => {
  minHeap.findOne({}, {}, { sort: { created_at: -1 } }, (err, data) => {
    if (err) return console.log("find failed");
    console.log("Here is the fetched data", data);
    res.locals.heap = data.heap;
    return next();
  });
};
listController.updateHeap = (req, res, next) => {
  console.log("heap updating", req.body);

  minHeap.findOneAndUpdate(
    {},
    { heap: req.body },
    { sort: { created_at: -1 } },
    (err, data) => {
      if (err) return console.log("Our update has failed ", err);
      console.log("I do believe that it has worked");
      return next();
    }
  );
  return next();
};

// Export the file controller back to my router
module.exports = listController;
