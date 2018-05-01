/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports =
{
    Bot_m : function(msg,arg) {
        msg.reply(eval(arg[0]));
    },
    Info : function() {
        return "Self explanatory.";
    }
};

