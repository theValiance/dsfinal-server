module.exports = {
	apps: [{
		name: "dsfinal-server",
		script: "npm",
		args: "run start",
		instances: 1,
		watch: ['package.json', 'dist', 'dsfinal-server.config.cjs', '.env', '.env.production'],
		watch_delay: 5000,
	}]
}
