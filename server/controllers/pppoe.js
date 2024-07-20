const pppoe = require("../models/pppoe");
exports.createpppoe = async (req, res) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 25;
  try {
    let newpppoe = new pppoe({
      name: req.body.name,
      ip: req.body.ip,
      uptime: req.body.uptime,
      timestamp: req.body.timestamp,
    });
    await newpppoe.save();
    res.send(newpppoe);
  } catch (err) {
    console.log(err);
  }
};
exports.readpppoe = async (req, res) => {
  try {
    pppoe
      .find({}, (err, result) => {
        if (err) {
          res.json({ app: err });
        }
        res.send(result);
      })
      .sort()
      .skip(page * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
  }
};
exports.readpppoeFromID = async (req, res) => {
  try {
    await pppoe.findById({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ app: err });
      }
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
exports.updatepppoe = async (req, res) => {
  try {
    await pppoe.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        ip: req.body.ip,
        uptime: req.body.uptime,
        timestamp: req.body.timestamp,
      },
      (err, result) => {
        if (err) {
          res.json({ app: err });
        }
        res.send(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
};
exports.deletepppoe = async (req, res) => {
  try {
    if ((await pppoe.findById(req.params.id)) === null) {
      res.json({ app: "post not found" });
    } else {
      await pppoe.findByIdAndRemove(req.params.id).exec();
      res.json({ app: "post deleted" });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
