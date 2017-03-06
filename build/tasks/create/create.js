module.exports = function(grunt, _){

    grunt.registerTask('create','Dynamically clone a templated package',function(){
        var that = this
            , _ = require('lodash')
            , path = require('path')
            , ds = path.sep
            , fs = require('fs')
            , options = that.options({
                templates: 'build' + ds + 'tasks' + ds + 'create' + ds + 'templates'
                , target: 'src' + ds + 'Script'
            })
            , template = options.templates + ds + this.args[0]
            , target = options.target
            , destination = target + ds + this.args[0]
            , definition = grunt.file.readJSON(template + ds + 'create.json')
            , tokens = {}
            , resetTokens = function(){
                tokens = {};
            }
            , callbacks = {
                _this: function(arg){
                    return that.args && that.args[0];
                }
                , _target: function(arg){
                    return that.args && that.args[1];
                }
                , _date: function(arg){
                    var now = (new Date()).getTime();
                    return arg ? grunt.template.date(now, arg) : now;
                }
            }
            , tokenize = function(key){
                return key.replace(/\{\{[^\}]+\}\}/ig,function(token){

                    grunt.log.debug('Tokenizing '+token+'... ');

                    //remove handlebars
                    var trimmed = token.slice(2,-2)
                        , parts
                        , method
                        , arg = null
                        , result = false;

                    //if we have the token in the registry, return it
                    if(tokens[trimmed]){
                        result =  tokens[trimmed];
                    } else {
                        parts = trimmed.split(':');
                        method = '_' + parts.shift();

                        if(parts.length > 0){
                            arg = parts.join(':');
                        }
                        grunt.log.debug('Method: '+method+(arg?' with arg '+arg:' without args '));
                        if(callbacks[method]){
                            result = callbacks[method](arg);
                            tokens[trimmed] = result;
                        }
                    }
                    if(result){
                        grunt.log.debug(('-> ' + result)['green'].bold);
                    }

                    return result;

                });
            }
            , _err = function(msg){
                grunt.log.error();
                grunt.verbose.error();
                grunt.fail.warn(msg);
            }
            , getParentDir = function(child){
                return child.split('/').pop();
            }
            , _clone = function(src, target){
                var name = getParentDir(src), result;
                grunt.log.write('Cloning: '+src+' -> '+target+ds+name +'... ');
                if(grunt.file.exists(target + ds + name) && !grunt.option.force){
                    _err('Could not clone: ' + target + ds + name + ' already exists.');
                }

                grunt.file.recurse(src, function(abspath, rootdir, subdir, filename){
                    var to;
                    if(filename !== 'create.json'){
                       subdir = subdir ? ds + subdir : '';
                       to = target + ds + name + subdir + ds + filename;
                       grunt.file.copy(abspath, to);
                       grunt.verbose.ok('- '+to);
                   }
                });

                grunt.log.write("OK\n"['green'].bold);

            }
            , _rename = function(value, key){
                var kToken = tokenize(key)
                    , kPath = target + ds + kToken
                    , vToken = tokenize(value)
                    , vPath = target + ds + vToken;
                if(grunt.file.exists(kPath)){

                    grunt.log.write('Renaming ' + kPath + ' to ' + vPath + '... ');

                    fs.renameSync(kPath, vPath, function(err){
                        if(err){
                            _err('Unable to rename ' + kPath + ' to ' + vPath);
                        }
                    });
                    grunt.log.write("OK\n"['green'].bold);
                }

            }
            , _replace = function(value, key){
                var replacements = {};
                _.map(value.replacements, function(v, k){
                    var kToken = tokenize(k)
                        , vToken = tokenize(v)
                        , cToken = _.camelCase(vToken);
                    switch(value.case){
                        case "match":
                            //we do camel first so they'll get overwritten by upper/kebab if appropriate
                            replacements[_.camelCase(kToken)] = cToken;
                            replacements[_.upperFirst(_.camelCase(kToken))] = _.upperFirst(_.camelCase(cToken));
                            replacements[_.kebabCase(kToken)] = _.kebabCase(cToken);
                            break;
                        case "exact":
                        /* falls through */
                        default:
                            replacements[tokenize(k)] = tokenize(v);
                    }

                });
                _.map(value.targets, function(vv, kk){

                    var partialPath = tokenize(vv)
                        , file = target + ds + partialPath
                        , contents;


                    if(grunt.file.exists(file)){
                        grunt.verbose.writeln("\n");
                        contents = grunt.file.read(file);
                        _.map(replacements, function(replacement, original){
                            grunt.verbose.writeln('     replace: "'+original+'" -> "'+replacement+'"');
                            contents = contents.replace(new RegExp(original, 'g'), replacement);
                        });

                        grunt.file.write(file, contents);

                    } else {
                        _err('Unable to parse file ' + file);
                    }
                });

            };


        _clone(template, target);

        if(definition){

            if(definition.rename){
                _.map(definition.rename, _rename);
            }

            if(definition.replace){
                grunt.log.write('Replacing strings... ');
                _.map(definition.replace, _replace);
                grunt.log.write("OK\n"['green'].bold);
            }

        }

        grunt.log.subhead('New '+this.args[0]+' successfully created: ' + this.args[1]);
    });


};
