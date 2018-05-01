/* 
 * Bot_bal
 * Description:  Gets top 10 Balances on Ponzied coinhive.
 */

var auth = require('../auth.json');

module.exports = {
    Bot_bal : function(msg,args) {
        var balancestring = "Hash Balance ";
        var getJSON = require('get-json');
        //var i = client;
        getJSON('https://api.coinhive.com/user/top?secret='+auth.HiveToken, async function(error, response){
                console.log( msg.author.username + ' Accessing /bal');
                console.log(error);
                var i = 0;

                for(var key in response['users']){
                        i++;
                        balancestring += response['users'][key]['name'] + ":" + response['users'][key]['balance'] + " ";
                        if (i>=10) break;
                }
                msg.reply(balancestring);
        });
    }
};





