const Discord = require('discord.js');
const DetectLanguage = require('detectlanguage');
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
	if(msg.author.id!=client.user.id){
		detectLanguage.detect(msg.content, function(error, result) {
			var defaultLang = "";
			var lang = result[0]["language"];
			var reliable = result[0]["isReliable"];
			//console.log(JSON.stringify(a));
			//console.log(l);
			//console.log(r);
			if(reliable){
				languages.forEach(function(language){
					//console.log(entry);
					if(language["code"]===lang){
						defaultLang=language["name"];
						//msg.channel.send(language["name"]);
					}
				});
				//msg.channel.send(l);
			}
			console.log(msg.content.split(" "));
			detectLanguage.detect(msg.content.split(" "),function(error,result){
				console.log(result);
				result.forEach(function(entry){
					console.log(entry);
					var lang = entry[0]["language"];
					var reliable = entry[0]["isReliable"];
					if(reliable){
						languages.forEach(function(language){
							//console.log(entry);
							if(language["code"]===lang){
								msg.channel.send(language["name"]);
							}
						});
					}
					else{
						msg.channel.send(defaultLang);
					}
					});
						//msg.channel.send(l);
				});
		});
		}
		});

client.login(auth.token);