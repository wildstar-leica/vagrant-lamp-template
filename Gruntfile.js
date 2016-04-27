module.exports = function(grunt) {

    /***********************************************************/
    /** See ./build/tasks/config.js for package configuration **/
    /***********************************************************/
    var config = require('./build/tasks/config.js')(grunt)
        , create = require('./build/tasks/create/create.js')(grunt);

    grunt.initConfig({
        less: {
            options: {
                cleancss: true
            }
            , app: {
                src: 'src/Style/app.less'
                , dest: 'public/css/app.css'
            }
        }
    });


    grunt.registerTask('build', 'Build and update project files',function(package){
        package = package || 'all';
        grunt.task.run('getPackages:' + package, 'config', 'jshint', 'concat', 'wrap', 'uglify', 'less', 'runtime');
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-wrap');

    grunt.registerTask('default', ['build']);

};