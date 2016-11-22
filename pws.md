---
layout: page
title: Statistics from my Personal Weather Station 
back: true
epigraph: Come Rain or Come Shine
epigraphauthor: Johnny Mercer
---

I own a Personal Weather Station (model [PCE-FWS 20](https://www.pce-instruments.com/english/measuring-instruments/test-meters/thermometer-pce-instruments-thermometer-pce-fws-20-det_60037.htm) by [PCE Instruments](https://www.pce-instruments.com)) that measures temperature, relative humidity, precipitation, atmospheric pressure, wind speed and wind direction.

Its internal module has a USB post which I've connected to my living-room Raspberry Pi that runs [pywws]:http://pywws.readthedocs.io/en/latest/ to access logs from the station with the. 
A crontab on the Raspberry Pi that store the logs and publishes them to the [Weather Underground project]"wunderground.com/personal-weather-station/dashboard?ID=ILOMBARD329". 

<!-- 
<div class="controls">
    <button onclick="LastFMTreemap.getWkArtists();"><span class="all">Weekly Artists</span></button>
    <button onclick="LastFMTreemap.getWkAlbums();"><span class="pc">Weekly Albums</span></button>
    <button onclick="LastFMTreemap.getWkTracks();"><span class="mob">Weekly Tracks</span></button><br><br>
    <button onclick="LastFMTreemap.getTopArtists();"><span class="all">Top Artists</span></button>
    <button onclick="LastFMTreemap.getTopAlbums();"><span class="pc">Top Albums</span></button>
    <button onclick="LastFMTreemap.getTopTracks();"><span class="mob">Top Tracks</span></button>
</div>
-->
<div id='chart'>
    
</div>
<!--
<div id="legend">
<ul>
	<li class="q1"></li>
	<li class="q2"></li>
	<li class="q3"></li>
	<li class="q4"></li>
	<li class="q5"></li>
	<li class="q6"></li>
	<li class="q7"></li>
	<li class="q8"></li>
	<li class="q9"></li>
	<li class="q10"></li>
	<li class="q11"></li>
</ul>
<p class="more">more plays</p>
<p class="less">less plays</p>
</div>
-->
<script  type="text/javascript" src="/js/d3.v3.min.js"> </script>

<style>
body {
  shape-rendering: crispEdges;
}
.day {
  fill: #fff;
  stroke: #ccc;
}
.month {
  fill: none;
  stroke: #666;
  stroke-width: 1px;
}

/* Inside Temperature */
.temp .q10-11{fill:rgb(165,0,38)}
.RdYlGn .q9-11{fill:rgb(215,48,39)}
.RdYlGn .q8-11{fill:rgb(244,109,67)}
.RdYlGn .q7-11{fill:rgb(253,174,97)}
.RdYlGn .q6-11{fill:rgb(254,224,139)}
.RdYlGn .q5-11{fill:rgb(255,255,191)}
.RdYlGn .q4-11{fill:rgb(217,239,139)}
.RdYlGn .q3-11{fill:rgb(166,217,106)}
.RdYlGn .q2-11{fill:rgb(102,189,99)}
.RdYlGn .q1-11{fill:rgb(26,152,80)}
.RdYlGn .q0-11{fill:rgb(0,104,55)}

</style>
<script>

var width = 480,
    height = 75,
    cellSize = 8.4; // cell size

var thisYear = (new Date()).getFullYear();
	
var numberFormat = d3.format(".1"),
    dateFormat = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
    .domain([0,40])
    .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

var svg = d3.select("body").selectAll("svg")
    .data(d3.range(2015, thisYear+1))
	.enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  	.append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  	.enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return d3.time.weekOfYear(d) * cellSize; })
    .attr("y", function(d) { return d.getDay() * cellSize; })
    .datum(dateFormat);

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);

d3.csv("data/alldays.txt", function(error, csv) {
  if (error) throw error;

  var data = d3.nest()
    .key(function(d) { return d.Date; })
    .rollup(function(d) { return d[0].OutMax })
    .map(csv);

  rect.filter(function(d) { return d in data; })
      .attr("class", function(d) { return "day " + color(data[d]); })
    .select("title")
      .text(function(d) { return d + ": " + numberFormat(data[d])+'mm'; });
});

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
      d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}
</script>