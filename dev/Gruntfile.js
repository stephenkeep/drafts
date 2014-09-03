module.exports = function (grunt) {

	grunt.initConfig({
        concurrent: {
            dev: ['browserify', 'nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
        browserify: {
            js: {
                // A single entry point for our app
                src: '../main.js',
                // Compile to a single file to add a script tag for in your HTML
                dest: '../build/app.js',
            },
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['../build/**'],
                    watchedExtensions: ['js'],
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: 8080
                    },
                }
            }
        },
        removelogging: {
            dist: {
                src: [
                    '../**/*.js'
                ]
            }
        }
    });
    
    
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['concurrent:dev']);
	grunt.registerTask('cleanup', ['removelogging']);
    
};