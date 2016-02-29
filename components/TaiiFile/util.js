// define some global util functions
// Gets the directory list from the config file
var Util = function(){
    this.fs = require('fs');
    this.get_dir_list = function(callback){
        // get the cross platform home location
        var home = process.env[
            (process.platform == 'win32') ? 'USERPROFILE' : 'HOME'
        ];
        // get data from file
        var dir_list = this.fs.readFile(
            this.home + "/.taiifile/dir_list.json",
            "utf8",
            callback
        );
    }
    this.write_dir_list = function(dir_list, callback){
        this.fs.writeFile(
            this.home + "/.taiifile/dir_list.json",
            dir_list,
            callback
        );
    }
    // Represents the home directory on the current platform
    this.home = process.env[
        (process.platform == 'win32') ? 'USERPROFILE' : 'HOME'
    ];
}
window.util = new Util();
