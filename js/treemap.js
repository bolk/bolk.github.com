/*
var user = 'bolk',
	apikey = '2634b88ba216891879b9f88e64176762',
	methods = ['user.getTopArtists', 'user.getTopAlbums', 'user.getTopTracks'],
	selectors = ['topartists', 'topalbums', 'toptracks'],
	children = ['artist', 'album', 'track'],
	callback = ['artistGetinfo', 'albumGetInfo', 'trackGetInfo'],
	i = 0;
*/
//var palette = ['#92342c','#ca5c21','#ecb35c','#fff1a8','#588ad3'];

var LastFMTreemap = {
	
	methods: ['user.getTopArtists', 'user.getTopAlbums', 'user.getTopTracks','user.getWeeklyArtistChart', 'user.getWeeklyAlbumChart', 'user.getWeeklyTrackChart'],
	selectors: ['topartists', 'topalbums', 'toptracks','weeklyartistchart', 'weeklyalbumchart', 'weeklytrackchart'],
	children: ['artist', 'album', 'track','artist', 'album', 'track'],
	callback: ['artistGetinfo', 'albumGetInfo', 'trackGetInfo','artistGetinfo', 'albumGetInfo', 'trackGetInfo'],
	
	init: function(opt){
		opt = opt || {};
		LastFMTreemap.height = opt.height || 400;
		LastFMTreemap.width = opt.width || 680;
		LastFMTreemap.id = opt.id || '#chart';		
		LastFMTreemap.tt = opt.ts || 'timestamp';
		LastFMTreemap.ts = opt.selector ? opt.selector.value : 'ts';
		LastFMTreemap.ts1 = opt.selector ? opt.selector.value : 'ts1';
				
		LastFMTreemap.user = opt.user || 'bolk';
		LastFMTreemap.apikey = opt.apikey || '2634b88ba216891879b9f88e64176762';
		
		LastFMTreemap.selector = {};
		LastFMTreemap.selector.value = opt.selector ? opt.selector.value : 'playcount';

		LastFMTreemap.reset();
	},
	
	reset: function(){
		LastFMTreemap.div = d3.select(LastFMTreemap.id).html('').append("div")
		                             .style("position", "relative")
		                             .style("width", LastFMTreemap.width + "px")
		                             .style("height", LastFMTreemap.height + "px");
									LastFMTreemap.treemap = d3.layout.treemap()
									                        .size([LastFMTreemap.width, LastFMTreemap.height])
									                        .sticky(true)
									                        .value(function(d) { return d.playcount; });
	},
	
	cell: function() {
	  this
	      .style("left", function(d) { return d.x + "px"; })
	      .style("top", function(d) { return d.y + "px"; })
	      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
	      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
	},
	
	getData: function(type, callback, opt){
		LastFMTreemap.method = LastFMTreemap.methods[type];
		LastFMTreemap.selector = LastFMTreemap.selectors[type];
		LastFMTreemap.child = LastFMTreemap.children[type];
		
		d3.json("http://ws.audioscrobbler.com/2.0/?method=" + LastFMTreemap.method + "&user=" + LastFMTreemap.user + "&api_key=" + LastFMTreemap.apikey + "&format=json" + opt, 
		        function(json) {
					json[LastFMTreemap.selector].name = 'x';
					json[LastFMTreemap.selector].children = json[LastFMTreemap.selector][LastFMTreemap.child];
					
					LastFMTreemap.max = json[LastFMTreemap.selector].children[0].playcount;
					LastFMTreemap.min = json[LastFMTreemap.selector].children[json[LastFMTreemap.selector].children.length - 1].playcount;
					LastFMTreemap.max;
					LastFMTreemap.min;
					LastFMTreemap.delta = LastFMTreemap.max - LastFMTreemap.min;
					LastFMTreemap.step = LastFMTreemap.delta / 10;
					LastFMTreemap.from = moment.unix(json[LastFMTreemap.selector]['@attr'].from); 
					document.getElementById(LastFMTreemap.ts1).innerHTML=' since ' + LastFMTreemap.from.format("dddd, MMMM Do YYYY, h:mm:ss a")
				            LastFMTreemap.div
									.data([json[LastFMTreemap.selector]]).selectAll("div")
		                            .data(LastFMTreemap.treemap.nodes)
		                            .enter().append("div")
		                            .attr("class", function(d){ return "cell " + " q" + (Math.round((d.playcount - LastFMTreemap.min) / LastFMTreemap.step) + 1)})
									.attr("title", function(d) { return "this was heard playing " + d.playcount + " times."} )
		                            .call(LastFMTreemap.cell)
									.append('a')
									.attr("href", function(d){ return d.url; })
									.attr("onclick", function(d) { return callback + '("' + d.mbid + '")'} )
									.attr("target", "_blank")
		                            .text(function(d) { return d.children ? null : d.artist && d.artist.name ? d.name + ' played by ' + d.artist['name'] : d.artist && d.artist['#text'] ? d.name + ' played by ' + d.artist['#text'] : d.name; });
		        }
		);
	},
	getTopArtists: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(0, 'LastFMTreemap.ArtistInfo','');
		document.getElementById(LastFMTreemap.tt).innerHTML='Top Artists';
	}
	,getTopAlbums: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(1, 'LastFMTreemap.AlbumsInfo','');
		document.getElementById(LastFMTreemap.tt).innerHTML='Top Albums';		
	}
	,getTopTracks: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(2, 'LastFMTreemap.TrackInfo','');
		document.getElementById(LastFMTreemap.tt).innerHTML='Top Tracks';		
	}
	,getWkArtists: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(3, 'LastFMTreemap.ArtistInfo','');
		document.getElementById(LastFMTreemap.ts).innerHTML='Weekly Artists';
	}
	,getWkAlbums: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(4, 'LastFMTreemap.ArtistInfo','');
		document.getElementById(LastFMTreemap.ts).innerHTML='Weekly Albums';
		
	}
	,getWkTracks: function(){
		LastFMTreemap.reset();
		LastFMTreemap.getData(5, 'LastFMTreemap.ArtistInfo','');
		document.getElementById(LastFMTreemap.ts).innerHTML='Weekly Tracks'
		
	}
}


LastFMTreemap.init();
var today = moment().startOf('day').subtract('days',4);
console.log(today);
LastFMTreemap.to = today.unix();
LastFMTreemap.from = today.subtract('days',7).unix();
LastFMTreemap.getWkArtists();

/*
var width = 680, height = 400;

var treemap = d3.layout.treemap()
                        .size([width, height])
                        .sticky(true)
                        .value(function(d) { return d.playcount; });
                        

var div = d3.select("#chart").append("div")
                             .style("position", "relative")
                             .style("width", width + "px")
                             .style("height", height + "px");

method = methods[i];
selector = selectors[i];
child = children[i];

d3.json("http://ws.audioscrobbler.com/2.0/?method=" + method + "&user=" + user + "&api_key=" + apikey + "&format=json", 
        function(json) {
			json[selector].name = 'Bolk';
			json[selector].children = json[selector][child];
            div.data([json[selector]]).selectAll("div")
                            .data(treemap.nodes)
                            .enter().append("div")
                            .attr("class", "cell")
							.attr("title", function(d) { return d.mbid } )
//                            .style("background", function(d) { return d.image ? 'url(' + d.image[3]['#text'] + ')' : 'url(/img/vinyl.jpg)'; }) // (d.playcount < 100) ? palette[0] : ((d.playcount < 200) ? palette[1] : (d.playcount < 300) ? palette[2] : palette[3])  })
                            .call(cell)
							.append('a')
							.attr("href", function(d){ return d.url; })
							.attr("onclick", function(d) { return callback[i] + '("' + d.mbid + '")'} )
							.attr("target", "_blank")
                            .text(function(d) { return d.children ? null : d.name; });
                        });

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}
*/