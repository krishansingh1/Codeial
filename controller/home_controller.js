module.exports.home = function (req, res) {
  return res.end("<h1>Express is ready and setup</h1>");
};

module.exports.home2 = function (req, res) {
  return res.end("<h1>Home2 controller is runinn!</h1>");
};
