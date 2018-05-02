/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jimp = require('jimp');


var obj = null;

module.exports = {
    Bot_c4 : function(msg,args) {
        if (obj === null) obj =  new Connect4(msg,args);
        obj.MessageIn(msg,args);
        },
    Info : function() {
        return "Connect 4 game";
    }
    };
    
function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
        }    
       
class Connect4 {
    
    constructor(msg,args) {
        this.message = msg;
        this.args = args;
        this.board = null;
        this.ipath = "./Commands/Images/";
        this.images = ['red.png', 'green.png', 'c4box.png', 'top.png'];
        this.playing = false;
        this.gameOver = false;
        this.helpString = "Type: ```!c4 help``` for help";
        this.players = ['None','',''];
        this.player = 0;
        }
        
    MessageIn(msg,args) {
        if (args.length === 0) {
            msg.reply(this.helpString);
            return;
        }
        var cmd = args[0].toLowerCase();
        
        //End always works
        if (cmd === 'end') {
                obj = null;
                return;
            }
            
         if (cmd === 'show') {
                this.DrawBoard();
                ShowNextUp(msg);
                return;
            }
        if (this.gameOver) {
           
            msg.reply("Game is over.  !C4 end to quit");
            return;
        }
        if (this.playing) {
            try {
                var col = parseInt(cmd);
                console.log("checking players");
                if (!this.CheckPlayers(msg.author.username)) {
                    msg.reply("Not your turn!")
                    return;
                }
                if ((col > 0) && (col <= 8)) {
                    console.log("drop: " + col);
                    this.DropToken(col-1);
                    this.DrawBoard(msg);
                    this.ShowNextUp(msg);
                }
                return;
            } catch (err) {
                console.log(err);
            }
        }
        
        //Not playing, so no game in progress
        
        if (cmd === 'start') {
           this.StartGame(); 
        }
       
        if (cmd === 'help') {
            this.showHelp(msg);
            return;
        }
    }
    ShowNextUp(msg) {
        console.log("Show Next Up:" +this.players[this.player]);
        if (this.players[this.player] !== '') {
            msg.channel.send(this.players[this.player] + " up!");
        }
    }
    
    CheckPlayers(username) {
        console.log("UserCheck:" + username);
        if (this.players[this.player] === '') {
            this.players[this.player] = username;
            } else {
            if (username !== this.players[this.player]) {
                return false;
            }
        }
        return true;
    }
        
    showHelp(msg) {
        msg.reply("C4 Help");
        msg.reply("!c4 start - Start Game");
        msg.reply("!c4 end - End Game");
        msg.reply("!c4 show - Show Board");
        msg.reply("!c4 1-8 - Drop Token on column 1-8");
    }
    
    DropToken(x) {
        //board is [x,y]
        var y;
        
        
        
        
        for (y = 7; y>=0;y--) {
            console.log("Spot " + y + '=' + this.board[x][y]);
            if (this.board[x][y] === 0) {
                console.log("Found a spot " + x + ' ' + y);
                    
                
                
                
                this.board[x][y] = this.player;
                
                
                
                
                if (this.player===1) {
                    this.player = 2;
                } else {
                    this.player = 1;
                }
                return;
            } else {
                 
            }
        }
    }
    
    
    StartGame() {
        if (this.playing) {
            this.message.reply("Game in progress...");
            return;
        }
        if (this.gameFinished) return;
        this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0));
        var x,y;
        for (y = 0; y < 8; y++) 
            for (x = 0; x < 8; x++) this.board[x][y] = 0;
        this.player = 1;
        this.playing = true;
        this.p1 = '';
        this.p2 = '';
        
        this.DrawBoard();
    }

    getRndString(arr) {
            var ct = arr.length;
            var idx = this.getRndInteger(0,ct);
            return arr[idx];
        }

    Run() {
            this.message.channel.send({ file: st});
        }

    
    GetBoardLimit(x,y) {
        if ((x >=0 ) && (x<8) && (y>=0) && (y<8)) {
            return this.board[x][y];
        }
        return 0;
    }
    CountConseq(ix,iy,vx,vy) {
        var last = 0;
        var cons = 0;
        var x = ix;
        var y = iy;
        var i = 0;
        for (i=0;i<8;i++) {
            var test = this.GetBoardLimit(x,y);
            if (test == last) {
                if (test != 0) cons++;
                if (cons >= 4) return test;
            } else {
                cons = 0;
                last = test;
            }
            x+=vx;
            y+=vy;
        }
        return 0;
    }
    GetWinner() {
        var i;
        for (i=0;i<8;i++) {
            //From the top, look S
            var res = this.CountConseq(i,0,0,1);
            if (res !== 0) return res;
            //From the left,look E
            var res = this.CountConseq(0,i,1,0);
            if (res !== 0) return res;
            
            //From the left,look NE
            var res = this.CountConseq(0,i,1,-1);
            if (res !== 0) return res;
            
            //From the bottom look NE
            var res = this.CountConseq(i,7,1,-1);
            if (res !== 0) return res;
            
            //From the bottom look NW
            var res = this.CountConseq(i,7,-1,-1);
            if (res !== 0) return res;
            
            //From the right, look NW
            var res = this.CountConseq(7,i,-1,-1);
            if (res !== 0) return res;
            return 0;
        }
    }
   
    DrawBoard() {
        try {
            
         
           
            if (getRndInteger(0,4)>1) {
                console.log("asdf");
            }
            var promises = [];
            for (var i = 0; i < this.images.length; i++) promises.push(jimp.read(this.ipath+this.images[i]));
            var bg = new jimp(512, 512, function (err, image) { });
            
            console.log('loaded');
            
            
            Promise.all(promises).then(function(data) {return Promise.all(promises);})
                                 .then(function(data) {
                                     console.log('loaded');
                var x,y;
                
                for (y = 0; y < 8; y++) { 
                    for (x = 0; x < 8; x++) { 
                        bg.blit(data[2],x*64,y*64);
                        var tile = obj.board[x][y];
                        if (tile===1) {
                            bg.composite(data[0],x*64,y*64);
                        }
                        if (tile===2) {
                            bg.composite(data[1],x*64,y*64);
                        }
                    }
                    if (y===0) bg.composite(data[3],0,0);
                }
                if (obj.player === 1) bg.composite(data[0],256-32,-32);
                if (obj.player === 2) bg.composite(data[1],256-32,-32);
                console.log("wrote the image");
                bg.write('test.png', function() {
                console.log("wrote the image");
                obj.message.channel.send({ file: 'test.png'});
                
                
                });
            });

        } catch (err) {
            console.log("error");
        }
    }
}






