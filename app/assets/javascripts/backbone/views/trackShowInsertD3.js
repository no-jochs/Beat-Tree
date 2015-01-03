BT.Utils.TrackShowD3 = function (view, data, title, info) {
	$('div.track-show-d3 .modal-header')
	    .empty()
		.html(
			'<h3>' + title + '</h3>' +
			'<em>' + info + '</em>'
		);
		
	$('#track-show-d3-container').empty();
	
	var that = view;
	
	var w = 1140, h = 600;
	
	var parsedData = BT.Utils.ParseNodesAndLinks(data, that.model.id);
	var nodes = parsedData.nodes, links = parsedData.links;
	var legendData = [
		{"key": "Predecessors", "color": "#FFDE00"},
		{"key": "Current Track", "color": "#6599FF"},
		{"key": "Progeny", "color": "#FF9900"},			
	];
	
	var graph = d3.select('#track-show-d3-container')
				  .append('svg')
				  .attr('width', w)
				  .attr('height', h);
				  
	var legend = graph.selectAll('.legend')
				  	  .data(legendData)
				  	  .enter()
				      .append('svg:g')
				  	  .attr('class', 'legend')
				  	  .attr('transform', function (d, i) {
						  return 'translate(10, ' + (10 + 20 * i) + ')'
				  	  })
					  
  		  	    legend.append('rect')
					  .attr('width', 16)
					  .attr('height', 16)
					  .style('fill', function (d) {
						  return d.color;
					  })
					  
				legend.append('text')
					  .attr('class', 'legend-text')
					  .text( function (d) {
						  return d.key;
					  })
					  .attr('x', 20)
					  .attr('y', 15)
					  
		
	graph.append("svg:defs").selectAll("marker")
						    .data(["arrow"])
							.enter().append("svg:marker")
						    .attr("id", String)
						    .attr("viewBox", "0 -5 10 10")
						    .attr("refX", 10)
						    .attr("refY", 0)
						    .attr("markerWidth", 10)
						    .attr("markerHeight", 10)
						    .attr("orient", "auto")
						    .append("svg:path")
						    .attr("d", "M-1 -2L4 0L-1 2");
							
	
	var force = d3.layout.force()
						  .nodes(nodes)
						  .links(links)
						  .gravity(0.1)
						  .charge(-1000)
						  .size([w, h])
						  .linkDistance(120);
	
  var drag = force.drag().on('dragstart', dragstart);

	var link = graph.selectAll('.link')
					.data(links)
					.enter().append('line')
					.attr('class', 'link arrow')
					.attr('marker-end', 'url(#arrow)')
					.style({
						'stroke': '#909090',
						'stroke-width': '3px'
					})
	
	var node = graph.selectAll('circle')
					.data(nodes)
					.enter().append('g')
					.attr('track-id', function (d) {
						return d.track_spotify_id;
					})
					.on('dblclick', dblclick)
					.call(force.drag);
			
	node.append('circle')
		.attr('cx', function (d) { return d.x })
		.attr('cy', function (d) { return d.y })
		.attr('r', 20)
		.attr('fill', function (d) {
			if (d.id === that.model.id) {
				return "#6599FF";
			} else if (d.predecessor != undefined ) {
				return "#FFDE00";
			} else {
				return "#FF9900";
			}
		}).style({'border': '1px solid black'})
		.on('mouseover', showtooltip)
		.on('mouseleave', hidetooltip);

		
   var labels = graph.selectAll('.link-label')
   	 			     .data(links)
   	 			     .enter()
   	 			     .append('svg:text')
   	 			     .text( function (d) {
   	 			     	 return d.label;
   	 			     }).attr('class', 'link-label')
					 .attr('dy', -3)
   	 			     .attr('text-anchor', 'middle');
					 
	node.append('svg:text')
		.attr('class', 'node-tooltip')
		.style('opacity', 1e-6)
		.attr('dx', 20)
		.attr('dy', 5)
		.text(function (d) {
			return "[" + d.artist_name + "] " + d.track_name;
		})
			
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

	  node.attr("transform", function(d, i) {
			  return 'translate(' + d.x + ', ' + d.y + ')';
		  });
		  
	  labels.attr('transform', function (d) {
   		 var dx = (nodes[d.target.index].x - nodes[d.source.index].x),
   			 dy = (nodes[d.target.index].y - nodes[d.source.index].y);
   			 var dr = Math.sqrt(dx * dx + dy * dy);
   			 var offset = (1 - (1 / dr)) / 2;
   			 var deg = 180 / Math.PI * Math.atan2(dy, dx);
   			 var x = (nodes[d.source.index].x + dx * offset);
   			 var y = (nodes[d.source.index].y + dy * offset);
   			 return "translate(" + x + ", " + y + ") rotate(" + deg + ")";
   	 });
    });
	
	force.start();
	
	function dblclick(d) {
		var circle = d3.select(this);
		circle.classed('fixed', d.fixed = false);
		if (circle.classed('active-portal')) {
			var trackId = $(circle.node()).attr('track-id');
			Backbone.history.navigate('#tracks/' + trackId, { trigger: true });
			BT.Utils.FreePage();
		}
		circle.classed('active-portal', true);
		setTimeout( function () {
			circle.classed('active-portal', false);
		}, 1000);
	}
	
	function dragstart(d) {
		d3.select(this).classed('fixed', d.fixed = true);
	}
	
	function showtooltip (d) {
		d3.select(this.parentElement)
		  .select('text')
		  .transition()
		  .duration(500)
		  .style('opacity', 1);
	}
	
	function hidetooltip (d) {
	d3.select(this.parentElement)
	  .select('text')
	  .transition()
	  .duration(500)
	  .style('opacity', 1e-6);
	}
}