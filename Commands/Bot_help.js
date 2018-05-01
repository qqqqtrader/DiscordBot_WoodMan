/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



module.exports = {
    Bot_help : function(msg,args) {
        var obj =  new Helper(msg,args);
        obj.Run();
        },
    Info : function() {
        return "Self Explanatory";
    }
    };
       
class  Helper {
    constructor(msg,args) {
        this.message = msg;
        this.args = args;
        }


    Run() {
            var fs = require('fs');
            var files = fs.readdirSync('./Commands/');
            this.message.channel.send(files);
            
            //console.log(st);
            
        }
    }

           

