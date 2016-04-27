module.exports = function(grunt){
    var startTime = (new Date()).getTime()
        , path = require('path')
        , ds = path.sep
        , srcPath = "src" + ds + "Script"
        , packageSrcFragment = ds + "src"
        , packageDestFragment = ds
        , publicPath = "public" + ds + "js"
        , _ = require('lodash')
        , packages = {}
        , definePackage = function(path, config){
            var packages = []
                , vars = []
                , before = ''
                , after = '';

            if(config.requires){

                _.map(config.requires, function(value, key){
                    var isString = typeof value === 'string'
                        , package = (isString) ? value : (_.keys(value))[0]
                        , name = (isString)? value : value[package];
                    packages.push(package);
                    name = name.split('/').pop();
                    name = name.indexOf('-') !== -1 ? _.camelCase(name) : name;
                    vars.push(name);
                });

                packages = "'" + packages.join("', '") + "'";
                vars = vars.join(', ');

                before = "var context = (typeof global !== 'undefined')? global : window;\n";
                before += "define([" + packages + "], function(" + vars + "){\n";
                before += "\tvar module = {exports: {}};\n";
                after = "\treturn module.exports;\n});";
            }

            return [before, after];
        };

    grunt.registerTask('config', function(){

        /*************************************/
        /** ACTUAL DYNAMIC CONFIG GOES HERE **/
        /*************************************/

        grunt.config.set('concat', _.mapValues(packages, function(value, key){
            return {
                files: [{src: value.build.src, dest: value.build.dest}]
                , options: {
                    stripBanners: {block: true}
                }
            };
        }));

        grunt.config.set('wrap', _.mapValues(packages, function(value, key){
            var definition = {
                files: [{src: value.build.src, dest: value.build.dest}]
            };

            if(value.build.isAMD){
                definition.options = {
                    requires: value.build.requires || false
                    , indent: '\t'
                    , wrapper: definePackage
                };
            }
            return definition;
        }));

        grunt.config.set('jshint', _.merge(
            {
                grunt: ['Gruntfile.js','build/tasks/*.js','build/tasks/*/*.js']
                , options: {
                expr: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                jquery: true,
                laxcomma: true,
                node: true
            }
            }
            , _.mapValues(packages, function(value, key){
                return _.union(
                    typeof value.build.tests === 'string' ? [value.build.tests] : value.build.tests
                    , typeof value.build.src === 'string' ? [value.build.src] : value.build.src
                );
            })
        ));

        grunt.config.set('uglify', _.merge(
            {
                all: {
                    options: {
                        preserveComments: 'some'
                        , sourceMap: true
                    }
                }
            }
            , _.mapValues(packages, function(value, key){
                return {
                    files: [{src: value.build.dest, dest: value.build.ugly}]
                };
            })
        ));

    });

    grunt.registerTask('getPackages','Dynamically configure file paths',function(){
        var package = (this.args && this.args.length > 0 && this.args[0]) || 'all'
            , paths = (package !== 'all') && package || '*';

        paths = srcPath + ds + paths + ds + 'package.json';
        paths = grunt.file.expand(paths);
        _.map(paths, function(file){
            var src = grunt.file.readJSON(file)
                , packagePath
                , defaults;

            if(src){
                packagePath = path.dirname(file);
                defaults = {
                    build: {
                        src: packagePath + ds + "src" + ds + "*.js"
                        , dest: packagePath + ds + src.name + ".js"
                        , ugly: publicPath + ds + src.name + ".js"
                        , tests: packagePath + ds + "tests" + ds + "*.js"
                        , fixtures: packagePath + ds + "tests" + ds + "index.html"
                        , requires: {}
                        , isAMD: true
                    }
                };
                packages[src.name]= _.merge(defaults, src);
            }
        });

    });

    grunt.registerTask('runtime','Record execution time', function(){
        var elapsed = ((new Date()).getTime() - startTime)/1000
            , hours = Math.floor(elapsed / 3600)
            , minutes = Math.floor((elapsed %= 3600)/60)
            , seconds = Math.floor(elapsed % 60);

        grunt.log.ok('OK (' + hours + ':' + minutes + ':' + seconds + ')');

    });


};

