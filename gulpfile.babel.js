import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build"], function() {
	gulp.watch(["app/**/*"], ["webpack:build"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

let webpack_config = {
  entry: "./entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
						test: /\.css$/,
						loader: "style-loader!css-loader"
					},
					{
		        test: /\.scss$/,
		        loader: 'style!css!sass'
		      },
          {
						test: /\.js$/, exclude: /node_modules/,
						loader: "babel-loader",
						query: {
	            optional: ['runtime'],
	            stage: 0
	          }
					}
      ]
  },
	plugins : [
		new webpack.optimize.UglifyJsPlugin()
	]
};

gulp.task("webpack:build", function(callback) {
	// run webpack
	webpack(webpack_config, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpack_config);

  new WebpackDevServer(compiler, {
      // server and middleware options
  }).listen(8082, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log("[webpack-dev-server]", "http://localhost:8082/webpack-dev-server/index.html");

      // keep the server alive or continue?
      // callback();
  });
});
