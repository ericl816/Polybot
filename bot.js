const Discord = require('discord.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var auth = require('./auth.json');
const client = new Discord.Client();
var channels = new Map();
var keys = [];
var said = new Map();

var getLangs = new XMLHttpRequest();
getLangs.onreadystatechange = function(){
	if(this.readyState==4&&this.status==200){
		for(var k in JSON.parse(this.responseText)["langs"]) keys.push(k);
		//console.log(keys);
	}
}
getLangs.open("GET","https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb",false);
getLangs.send();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
		if (msg.content.substring(0, 3) == 'FD%'){
			var args = msg.content.substring(3).split(" ");
			switch(args[0]){
			case 'create':
				if(keys.indexOf(args[1].toLowerCase()) < 0) break;
				if(channels.has(msg.channel)) break;
				channels.set(msg.channel,args[1].toLowerCase());
				msg.channel.send("Created a new translation channel with "+ args[1]+" as the language.");
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						said.set(args[1].toLowerCase(),JSON.parse(this.responseText)["text"][0]);
					}
				}
				xhttp.open("GET","https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang="+args[1].toLowerCase()+"&text=said",false);
				xhttp.send();
				break;
			case 'delete':
				if(channels.delete(msg.channel)){
					msg.channel.send("Deleted the current translation channel.");
				}
				break;
			}
		}else{
			channels.forEach(function(value,key,map){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						//console.log(JSON.parse(this.responseText));
						key.send(msg.author.tag+" "+said[value]+" "+JSON.parse(this.responseText)["text"][0]);
					}
				}
				xhttp.open("GET","https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang="+value+"&text="+encodeURI(msg.content),false);
				xhttp.send();
			});
		}
	}
});

client.login(auth.token);