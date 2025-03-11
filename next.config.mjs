/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config, { isServer }) {
		if (!isServer) {
			config.externals.push("sharp");
		}

		// shader support
		config.module.rules.push({
			test: /\.(glsl|vs|fs|vert|frag)$/,
			exclude: /node_modules/,
			use: ["raw-loader", "glslify-loader"],
		});

		return config;
	},
};

export default nextConfig;
