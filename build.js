var fs = require("fs");
var browserify = require("browserify");

browserify([
  "./client/components/SignIn.jsx",
  "./client/components/SignUp.jsx",
  "./client/components/App.jsx",
  "./client/components/index.jsx"])
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("client/build/js/components.js"));