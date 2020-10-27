const withSass = require("@zeit/next-sass");

module.exports = withSass({
	webpack(config, options) {
		config.module.rules.push({
			test: /\.(jpg|jpeg|png|gif)$/,
			use: {
				loader: "file-loader",
				options: {
					limit: 100000,
				},
			},
		});

		return config;
	},
});
