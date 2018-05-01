
module.exports = {
    Bot_catshit : function(msg,args) {
        var obj =  new CatPooper(msg,args);
        obj.Run();
        }
    };
       
class  CatPooper {
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
            var files = fs.readdirSync('./CatShit/');
            console.log(files);
            var st = "./CatShit/" + this.getRndString(files);
            //console.log(st);
            this.message.channel.send({ file: st});
        }
    }

           
     




