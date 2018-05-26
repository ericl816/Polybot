const Discord = require('discord.js');
const DetectLanguage = require('detectlanguage');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var auth = require('./auth.json');
const client = new Discord.Client();
var detectLanguage = new DetectLanguage({
	key:'c6378c3e5bf306205bdee72bc263b5d2'
});
var languages={};
detectLanguage.languages(function(error,result){
	//console.log(result);
	languages=result;
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText));
				msg.channel.send(JSON.parse(this.responseText)["text"][0]);
			}
		}
		xhttp.open("GET","https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang=en&text="+encodeURI(msg.content),false);
		xhttp.send();
	}
});

client.login(auth.token);