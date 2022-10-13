module.exports.signUp = function (req, res) {
  // return res.end("<h1>User Controller is up and runinn!</h1>");

  return res.render("signUp", {
    title: "Codeial/ SignUp",
  });
};

module.exports.signIn = function (req, res) {
  // return res.end("<h1>Profile 2 Controller is up and runinn!</h1>");
  return res.render("signIn", {
    title: "Codeial / SignIn",
  });
};
