module.exports = function (grunt) {

	grunt.initConfig({
        concurrent: {
            dev: ['nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: [],
                    watchedExtensions: ['js'],
                    nodeArgs: [],
                    delayTime: 1,
                    env: {
                        PORT: 3040
                    },
                }
            }
        }
    });
    
    
    grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-remove-logging');

    
	grunt.registerTask('default', ['concurrent:dev']);
    
};