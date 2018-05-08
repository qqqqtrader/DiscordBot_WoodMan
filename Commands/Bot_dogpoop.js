/* 
 * Bot_dogpoop.js
 * Description:  Displays random image of dog pooping from ~/DogPooping
 */


module.exports = {
    Bot_dogpoop : function(msg,args) {
        var obj =  new DogPooper(msg,args);
        obj.Run();
        },
    Info : function() {
        return "Self Explanatory";
    }
    };
       
class  DogPooper {
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
            if (this.message.author.username === 'RabbitWood') {
                this.message.channel.send("You cant do this RW");
                    return;
            }
            var fs = require('fs');
            var files = fs.readdirSync('./DogPooping/');
            console.log(files);
            var st = "./DogPooping/" + this.getRndString(files);
            //console.log(st);
            this.message.channel.send({ file: st});
        }
    }

           
     




