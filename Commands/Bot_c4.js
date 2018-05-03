/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jimp = require('jimp');


var obj = null;

//Discord Client, for notifications.
var disClient = null;
var tstatus = '';
  
module.exports = {
    Bot_c4 : function(msg,args) {
        if (obj === null) obj =  new Connect4(msg,args);
        obj.MessageIn(msg,args);
        },
    Info : function() {
        return "Connect 4 game";
    },
    Init : function(dClient) {
        disClient =  dClient;
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
        this.images = ['red.png', 'green.png', 'c4box.png', 'top.png', 'bot.png'];
        this.playing = false;
        this.gameOver = false;
        this.helpString = "Type: ```!c4 help``` for help";
        this.players = ['None','',''];
        this.player = 0;
        this.loaded = false;
       
        msg.channel.send("C4: Loading Resources......");
        this.LoadResources();
        }
        
    MessageIn(msg,args) {
        
        if (!this.loaded) {
            console.log('not ready');
            return;
        }
        console.log('Players:' + this.players);
        console.log('Player:' + this.player);
        console.log('Playing:' + this.playing);
        console.log('Finished:' + this.gameOver);
                
        if (cmd === 'rank') {
            msg.channel.send("Rankings:  RabbitWood #1");
        }
        
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
                tstatus = this.GetNextUp();

                this.DrawBoard();
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
                    if (this.GetWinner()) {
                        console.log("Winner");
                        this.gameOver = true;
                        tstatus = this.GetNextUp();
                        this.DrawBoard();
                        return;
                    }
                    tstatus = this.GetNextUp();
                    this.DrawBoard();
                    //msg.channel.send(this.GetNextUp());
                }
               
            } catch (err) {
                console.log(err);
            }
             return;
        }
        
        //Not playing, so no game in progress
       
        if (cmd === 'help') {
            this.showHelp(msg);
            return;
        }
    }
    
    GetNextUp() {
        console.log("Show Next Up:" +this.players[this.player]);
        try {
            if (this.gameOver) {
                return this.players[this.player] + " has won!";
            }
            if (this.players[this.player] !== '') {
                return this.players[this.player] + " up!";
            }
            return 'Player ' + this.player + ' up';
        } catch (err) {
            console.log(err);
            return 'Unknown';
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
                
                
                
                if (!this.GetWinner()) {
                    if (this.player===1) {
                        this.player = 2;
                    } else {
                        this.player = 1;
                    }
                }
                return;
            }
        }
    }
    
    
    StartGame() {
        console.log("Starting Game");
        if (this.playing) {
            this.message.reply("Game in progress...");
            return;
        }
        //if (this.gameFinished) return;
        this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0));
        var x,y;
        for (y = 0; y < 8; y++) 
            for (x = 0; x < 8; x++) this.board[x][y] = 0;
        this.player = 1;
        this.playing = true;
        this.players = ['None','',''];
        tstatus = this.GetNextUp();
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
            //console.log(x+" "+y+":" + test + " Last:" + last + " Count:" + cons);
            
            if (test === last) {
                if (test !== 0) cons++;
                if (cons >= 4) {
                    console.log("Found a run of 4");
                    return test;
                    }
            } else {
                cons = 1;
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
            
        }
        return 0;
    }
   
    LoadResources() {
        var ps = [];
        console.log("Loading now");

        ps.push(jimp.read(this.ipath + "c4box.png").then(function (image) {
            obj.imBox = image;
        }));
        ps.push(jimp.read(this.ipath + "red.png").then(function (image) {
            obj.imRed = image;
        }));
        ps.push(jimp.read(this.ipath + "green.png").then(function (image) {
            obj.imGreen = image;
        }));
        ps.push(jimp.read(this.ipath + "top.png").then(function (image) {
            obj.imTop = image;
        }));
        ps.push(jimp.read(this.ipath + "bot.png").then(function (image) {
            obj.imBot = image;
        }));
        ps.push(jimp.loadFont(jimp.FONT_SANS_32_WHITE).then(function (font) {
            obj.imFont = font;
        }));

        Promise.all(ps).then(() => {
            obj.loaded = true;
            obj.imBg = new jimp(512, 576, function (err, image) { });
            console.log("Actually loaded now.");
            obj.StartGame();
        });
        console.log("Loading commands complete");
    }
    
    DrawBoard() {

        //tstatus = status;

        //setTimeout(myFunc, 1500, 'funky');

        console.log('DrawBoard');
        var x, y;
        for (y = 0; y < 8; y++) {
            for (x = 0; x < 8; x++) {
                this.imBg.blit(this.imBox, x * 64, y * 64);
                
                //Draw the numbers
                if ((x===7)&&(y===0)) this.imBg.composite(this.imTop, 0, 0);
            
        
                var tile = obj.board[x][y];
                if (tile === 1) {
                    this.imBg.composite(this.imRed, x * 64, y * 64);
        
                }
                if (tile === 2) {
                    this.imBg.composite(this.imGreen, x * 64, y * 64);
                }
            }
           
        }
        
        
        this.imBg.composite(this.imBot, 0, 512);
        this.imBg.print(this.imFont, 80, 525, tstatus);

        if (obj.player === 1)
            this.imBg.composite(this.imRed, 0,512);
        if (obj.player === 2)
            this.imBg.composite(this.imGreen, 0,512);
        
        
        console.log('DrawBoard: Printing done');
        this.imBg.write('test.png',function () {
                console.log('DrawBoard: test.png saved');
                obj.message.channel.send({file: 'test.png'});
            });
    }
}






