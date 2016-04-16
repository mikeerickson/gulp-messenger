// TASK CONFIGURATION
// task configuration only, use ./config for application configuration

"use strict";

module.exports = {

	logs: {
		dir: ['logs', 'spec/logs']
	},

	scripts: {
		src: ['./index.js','app/**/*.js','lib/**/*.js']
	},

	lint: {
		src:  ['./index.js','app/**/*.js','lib/**/*.js']
	},

	test: {
		//spec: ['./spec/**/*Spec.js'],
    spec: './spec/MessengerLineSpec.js',
		src: ['./spec/**/*Spec.js', './index.js', 'app/**/*.js'],
		reporter: {
			openReport: false
		}
	},

	todo: {
		src: ['tasks/**/*.js', './spec/**/*Spec.js', './index.js', 'app/**/*.js'],
		dest: ['TODO.md', 'todo.json']
	},

	clean: {
		src: ['logs', 'spec/logs','todo.*']
	}

};
