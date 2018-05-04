/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



module.exports = {
    Bot_cowpie : function(msg,args) {
        var obj =  new CowPie(msg,args);
        obj.Run();
        },
    Info : function() {
        return "Gets a random picture of a cat shitting.";
    }
    };
       
class  CowPie {
    constructor(msg,args) {
        this.message = msg;
        this.args = args;
        }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
        }
   
    getRndString(arr) {
            var ct = arr.length;
            var idx = this.getRndInteger(0,ct);
            return arr[idx];
        }

    Run() {
            var fs = require('fs');
            var files = fs.readdirSync('./CowPie/');
            console.log(files);
            var st = "./CowPie/" + this.getRndString(files);
            //console.log(st);
            this.message.channel.send({ file: st});
        }
    }

           
     




