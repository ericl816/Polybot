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
		var fin = "";
		var a = msg.content.split(" ");
		console.log(a);
		var i = 0;
		while(i<a.length){
			//while(wait){}//sleep(100);
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(JSON.parse(this.responseText)["text"][0]);
					fin += (JSON.parse(this.responseText)["text"][0])+" ";
				}
			}
			xhttp.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang=en&text="+encodeURI(a[i]), false);
			xhttp.send();
			i++;
		}
		msg.channel.send(fin);
		/*var fin = ""
		const requests = msg.content.split(" ").map(function(word){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.log(JSON.parse(this.responseText)["text"][0]);
					fin += (JSON.parse(this.responseText)["text"][0]);
				}
			}
			xhttp.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang=en&text="+encodeURI(word), true);
			xhttp.send();
		});
		Promise.all(requests).then(() => {
			console.log(fin);
			console.log(1);
		});*/
		/*var fin = "&text="+msg.content.split(" ").map(encodeURI).join("&text=");
		console.log(fin);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			console.log(this.responseText);
			/*if (this.readyState == 4 && this.status == 200) {
				console.log(JSON.parse(this.responseText)["text"]);
				msg.channel.send(JSON.parse(this.responseText)["text"][0]);
			}
		};
		xhttp.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang=en"+fin, true);
		xhttp.send();*/
		/*detectLanguage.detect(msg.content.split(" "),function(error,result){
			console.log(result);
			var fin = "";
			result.forEach(function(entry){
				console.log(entry);
				var lang = entry[0]["language"];
				var reliable = entry[0]["isReliable"];
				if(reliable){
					languages.forEach(function(language){
						//console.log(entry);
						if(language["code"]===lang){
							fin += language["name"]+" ";
							//msg.channel.send(language["name"]);
						}
					});
				}
				else{
					fin += defaultLang+" ";
					//msg.channel.send(defaultLang);
				}
				});
					//msg.channel.send(l);
		});/*
		/*detectLanguage.detect(msg.content, function(error, result) {

			var defaultLang = "";
			var lang = result[0]["language"];
			var reliable = result[0]["isReliable"];
			//console.log(JSON.stringify(a));
			//console.log(l);
			//console.log(r);
			if(reliable){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					console.log(this.status);
					if (this.readyState == 4 && this.status == 200) {
						console.log(JSON.parse(this.responseText)["text"]);
						msg.channel.send(JSON.parse(this.responseText)["text"][0]);
					}
				};
				xhttp.open("GET", "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180526T171026Z.1066dd013fbe3b67.3b6492e0482f4dcdff2421043f38c1b4777c3fdb&lang=en&text="+encodeURI(msg.content), true);
				xhttp.send(null);
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
			/*detectLanguage.detect(msg.content.split(" "),function(error,result){
				console.log(result);
				var fin = "";
				result.forEach(function(entry){
					console.log(entry);
					var lang = entry[0]["language"];
					var reliable = entry[0]["isReliable"];
					if(reliable){
						languages.forEach(function(language){
							//console.log(entry);
							if(language["code"]===lang){
								fin += language["name"]+" ";
								//msg.channel.send(language["name"]);
							}
						});
					}
					else{
						fin += defaultLang+" ";
						//msg.channel.send(defaultLang);
					}
					}.done(function(){msg.channel.send(fin)}));
						//msg.channel.send(l);
				});*/
	}
		});

client.login(auth.token);