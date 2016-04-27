/*global module, jquery*/
(function($){

    var Package = function(){
        return this.init();
    };

    Package.prototype = {
        constructor: Package
        , type: 'Package'
        , init: function(){
            //do init stuff
        }
    };

    module.exports = Package;
})(jquery);