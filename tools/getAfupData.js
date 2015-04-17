//casperjs --ignore-ssl-errors=yes --web-security=no collector.js --collector=<<collector name>> [--log-level='debug']

var casper = require('casper').create({
    verbose: true,
	/*logLevel: logLvl,*/
    pageSettings: {
        loadImages:  false,       // The WebPage instance used by Casper will
        loadPlugins: true,        // use these settings
        userAgent:   'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    },
	viewportSize: {
        width: 1400,
        height: 768
    },
    onWaitTimeout: function() {
        logConsole('Wait TimeOut Occured');
        this.capture('xWait_timeout.png');
        this.exit();
    },
    onStepTimeout: function() {
        logConsole('Step TimeOut Occured');
        this.capture('xStepTimeout.png');
        this.exit();
    }
});

var debug=true;

casper.start("http://afup.org/pages/phptourluxembourg2015/sessions.php", function() {
    this.capture('phptour.png');
	this.page.injectJs('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js');
});

function convert2Json(data) {
	var json_result = "";
	for(i=0;i<data.length;i++)
	{
		json_result += JSON.stringify(data[i]);
		(i+1<data.length)? json_result += ",\r\n":null;
	}

	return "["+json_result+"]";
}

var all_confs = new Array();
var conf_conferenciers = [];
var img_pattern = /<img.+?src=[\"'](.+?)[\"'].*?>/;
casper.then(function() {
	sessions = this.getElementsInfo('.session');
	var i=0;
	all_confs = this.evaluate(function() {
			var myTab = new Array();
			var conf  = null;

			function replaceAll(wordToReplace,replace,data)
			{
				re = new RegExp(wordToReplace, 'g');
				return data.replace(re,replace)
			}

			function sanitize(stringToReplace)
			{
				var filteredData = new String(stringToReplace);
				filteredData = filteredData.trim();
				//filteredData = filteredData.replace(/^[a-zA-Z0-9äöüÄÖÜ]*$/gi, '');
				filteredData = replaceAll('<[^>]*>', '',filteredData);
				filteredData = replaceAll('\n', '',filteredData);
				filteredData = replaceAll('\t', '',filteredData);
				filteredData = replaceAll('  ', ' ',filteredData);
				return filteredData;
			}

			function getDate(dateString,isStart) {
				var pattern = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}) - (\d{2}):(\d{2})/;
				if(isStart)
					date = dateString.replace(pattern,'$3-$2-$1T$4:$5:00');
				else
					date = dateString.replace(pattern,'$3-$2-$1T$6:$7:00');

				return date;
			}

				function conferencier(name, image, link) {
					this.name = sanitize(name);
					this.img = image;
					this.link = 'http://afup.org/pages/phptourluxembourg2015/' + link;
				}

			function conference(id,name,date,horaire,salle,detail,conferenciers) {
				var img_pattern = /<img.+?src=[\"'](.+?)[\"'].*?>/;
				this.id = id;
				this.name = sanitize(name);
				// if(this.id == 983) {
				// 	this.name = name;
				// }
				this.date = sanitize(date);
				this.horaire = sanitize(horaire);
				this.salle = sanitize(salle);
				this.detail = sanitize(detail);
				this.conferenciers = conferenciers;
				this.date_start = getDate(this.date,true);
				this.date_end = getDate(this.date,false);
				this.lang = (detail.indexOf("picto-en") > -1)?"EN":"FR";
			}

			$( ".session" ).each(function( index,self ) {
				var conf_conferenciers = new Array();
				name = $(self).find("h3").text();
				date = $(self).find(".horaire").text();
				horaire = $(self).find('.horaire strong').text();
				salle = $(self).find(".salle").text();
				detail = $(self).find(".abstract").html();
				id = $(self).find("a").attr("name");

				conferenciers = $(self).find(".conferencier");

				$(conferenciers).each(function(i,self) {
					var img_pattern = /<img.+?src=[\"'](.+?)[\"'].*?>/;
					conferencier_nom = $(self).text();
					conferencier_image = ($(self).html()).match(img_pattern)[1];
					conferencier_link = $(self).find("a").attr("href");
					conf_conferenciers.push(new conferencier(conferencier_nom,conferencier_image,conferencier_link));
				});

				conf = new conference(id,name,date,horaire,salle,detail,conf_conferenciers)
				myTab.push(conf);
			});

			return myTab;
		});

});



casper.run(function() {
	var fs = require('fs');
	jsondata = convert2Json(all_confs);
	fs.write("../data/data.json", jsondata, 'w');
	require('utils').dump(all_confs[37]);
	this.exit();
});
