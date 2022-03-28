module.exports = {
	apps: [
		{
			name: 'netkallo-next',
			exec_mode: 'fork',
			// instances: 'max',
			script: 'npm',
			args: 'start',
			env: {
				HOST: '0.0.0.0',
				PORT: 13000
			},
		},
	],
};
