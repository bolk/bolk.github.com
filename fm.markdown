---
layout: page
title: Music charts
epigraph: Without music life would be a mistake
epigraphauthor: Friedrich Nietzche
---
## Treemaps of music I scrobbled

A treemap recursively subdivides area into rectangles; the area of any node in the tree corresponds to its value. This example uses color to encode different packages of the Flare visualization toolkit. Treemap design invented by <a href='http://www.cs.umd.edu/~ben/'>Ben Shneiderman</a>. Squarified algorithm by <a href='http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.36.6685'>Bruls, Huizing and van Wijk</a>.

<div class="controls">

    <label class="sel" for="type_artist" onclick="LastFMTreemap.getTopArtists();"><span class="all">Top Artists</span></label>
    <label for="type_album" onclick="LastFMTreemap.getTopAlbums();"><span class="pc">Top Albums</span></label>
    <label for="type_track" onclick="LastFMTreemap.getTopTracks();"><span class="mob">Top Tracks</span></label>

</div>
				
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

<hr style="clear:both;">
<div id='chart'>
    
</div>

<script  type="text/javascript" src="/js/d3.v2.min.js"> </script>
<script  type="text/javascript" src="/js/treemap.js"> </script>

<style>
.cell {
    border: 1px solid #000;
    font: 10px/12px "Trebuchet MS",Tahoma, sans-serif;
    overflow: hidden;
    position: absolute;
    color:#fff;
    text-align:center;
    vertical-align:middle;
    
}

 .q1 {
	background: #5E4FA2;
}

.q2 {
	background: #3288BD;
}

.q3 {
	background: #66C2A5;
}

.q4 {
	background: #ABDDA4;
}

.q5 {
	background: #E6F598;
}

.q6 {
	background: #FFFFBF;
	background: #f6faaa;
	/*border-color: #f6faaa;*/
}

.q7 {
	background: #FEE08B;
}

.q8 {
	background: #FDAE61;
}

.q9 {
	background: #F46D43;
}

.q10 {
	background: #D53E4F;
}

.q11 {
	background: #9E0142;
}

#legend {
	width: 165px;
	color: #777;
	margin-top: 10px;
	background: #f3f3f3;
	border: 1px solid #f0f0f0;
	overflow: hidden;
	padding: 5px 7px;
	-moz-border-radius: 3px;
	border-radius: 3px;
	font-size: 11px;
	line-height: 11px;
	margin-bottom: 10px;
	margin-right: 24px;
	margin-left: 0;
	float:right;
}

#legend ul {
	list-style-type: none;
	overflow: hidden;
	clear: both;
	margin-left: 0;
}

#legend li {
	float: left;
	margin-right: 1px;
	width: 14px;
	height: 14px;
}

#legend p {
	margin-top: 3px;
}

#legend p.more {
    clear:none;
	float: right;
}

#legend p.less {
    clear:none;
	float: left;
}

.controls {
	margin: 24px 0 20px 7px;
	font-size: 12px;
	line-height: 12px;
	float:left;
}

.controls input {
	display: none;
	width: 0;
	height: 0;
	margin: 0;
	padding: 0;
	opacity: 0;
}

.controls label {
	float: left;
	display: block;
	cursor: pointer;
	padding: 4px 6px;
	background: #ddd;
	border: 1px solid #ccc;
	-moz-border-radius: 2px;
	border-radius: 2px;
	margin: 0 3px 2px 0;
	color: #888;
}

.controls label:hover {
	background: #999;
	color: white;
	border: 1px solid #888;
}

.controls label.sel {
	background: #444;
	color: white;
	border: 1px solid #333;
	cursor: default;
}

.controls button {
	padding: 2px 6px 3px 6px;
	background: #ddd;
	border: 1px solid #ccc;
	-moz-border-radius: 2px;
	border-radius: 2px;
	cursor: pointer;
	color: #888;
	font-size: 12px;
	margin: 0;
	
}

.controls button:hover {
	background: #999;
	color: white;
	border: 1px solid #888;
}

.controls button.sel {
	background: #444;
	color: white;
	border: 1px solid #333;
	cursor: default;
}
</style>

