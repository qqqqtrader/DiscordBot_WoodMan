/* 
 *   Bot_crapbot.js
 *   Comamnd:  !crapbot
 *   Description:  Toggles the value of crapState and displays it.
 */

var crapState = 0;

module.exports =
{
    Bot_crapbot : function(msg,arg) {
        if (arg.length === 1) {
            NastyMessage(msg.channel,arg[0]);
            } else {
            crapState = 1 - crapState;
            msg.reply("CrapState:" + crapState);
            }
        },
    
    
    NastyMessage : function(channel,user) {
        channel.send('Fuck off ' + user);
    }
    
};








