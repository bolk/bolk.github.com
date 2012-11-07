---
layout: page
title: Visualizing my musical preferences over the years
epigraph: Without music life would be a mistake
epigraphauthor: Friedrich Nietzche
---

A treemap recursively subdivides area into rectangles; the area of any node in the tree corresponds to its value. This example uses color to encode different packages of the Flare visualization toolkit. Treemap design invented by <a href='http://www.cs.umd.edu/~ben/'>Ben Shneiderman</a>. Squarified algorithm by <a href='http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.36.6685'>Bruls, Huizing and van Wijk</a>.

<h2 id="title">
    
</h2>
<div class="controls">
    <button onclick="LastFMTreemap.getWkArtists();"><span class="all">Weekly Artists</span></button>
    <button onclick="LastFMTreemap.getWkAlbums();"><span class="pc">Weekly Albums</span></button>
    <button onclick="LastFMTreemap.getWkTracks();"><span class="mob">Weekly Tracks</span></button>
    <button onclick="LastFMTreemap.getTopArtists();"><span class="all">Top Artists</span></button>
    <button onclick="LastFMTreemap.getTopAlbums();"><span class="pc">Top Albums</span></button>
    <button onclick="LastFMTreemap.getTopTracks();"><span class="mob">Top Tracks</span></button>
</div>
				
<h3 id="ts1">
    
</h3>
<div id='chart'>
    
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

<script  type="text/javascript" src="/js/moment.min.js"> </script>
<script  type="text/javascript" src="/js/d3.v2.min.js"> </script>
<script  type="text/javascript" src="/js/treemap.js"> </script>

