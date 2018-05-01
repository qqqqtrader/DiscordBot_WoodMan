/* 
 *  Bot_ping.js
 *  Description:  Replies Pong when you type !ping
 */


module.exports =
{
    Bot_ping : function(msg,arg) {
        msg.reply("Pong!");
    },
    Info : function() {
        return "Self explanatory.";
    }
};


