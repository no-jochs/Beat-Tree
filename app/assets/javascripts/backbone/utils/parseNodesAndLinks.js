/* JSON response from server comes in as:

[ {type: 'SAMPLES', startNode: {track: [track JSON]}, endNode: {track: [track JSON]}}, {}, {}, ...]

*/

BT.Utils.ParseNodesAndLinks = function (data, trackId) {
	
	var nodeHash = {};
	var nodeArray = [];
	var linkHash = {};
	var linkArray = [];
	
	_(data).each ( function (respObj) {
		
		var startNodeId = respObj.startNode.track.id;
		var endNodeId = respObj.endNode.track.id;
		var relType = respObj.type;
		
		//If start node has not been added to the nodes array, it adds it
		//while keeping track of its position in the array.
		if (nodeHash[startNodeId] === undefined) {
			nodeHash[startNodeId] = nodeArray.length;
			nodeArray.push(respObj.startNode.track);
		}
		
		//Does the same thing for the end node.
		
		if (nodeHash[endNodeId] === undefined) {
			nodeHash[endNodeId] = nodeArray.length;
			nodeArray.push(respObj.endNode.track);
		}
		
		//Creates a link if it hasn't been created already.  The linkHash
		//also keeps track of the progeny of a particular track as such:
		// linkHash = {trackID : { samples: [prog1ID, prog2ID, ...], covers: [ ... ], ...} ... }
		
		if (linkHash[startNodeId] === undefined) {
			linkHash[startNodeId] = {};
			linkHash[startNodeId][relType] = [endNodeId];
			linkArray.push({
				"source": nodeHash[startNodeId],
				"target": nodeHash[endNodeId],
				"label": relType
			});
		} else if (linkHash[startNodeId][relType] === undefined) {
			linkHash[startNodeId][relType] = [];
			linkHash[startNodeId][relType].push(endNodeId);
			linkArray.push({
				"source": nodeHash[startNodeId],
				"target": nodeHash[endNodeId],
				"label": relType
			});
			
		} else {
			if (linkHash[startNodeId][relType].indexOf(endNodeId) === -1) {
				linkHash[startNodeId][relType].push(endNodeId);
				linkArray.push({
					"source": nodeHash[startNodeId],
					"target": nodeHash[endNodeId],
					"label": relType
				});
			}
		}
		
		
	});
		
	var progToTag = [];
	var tagged = [];
	
	
	
	//Initially populating the array of tracks to tag as progeny
	_.each(linkHash[trackId], function (trackArr, relType) {
		progToTag = progToTag.concat(trackArr);
	}, this)
	
	
	while (progToTag.length > 0) {
		currentId = progToTag[0];
		if (tagged.indexOf(currentId) === -1) {
			_.each(linkHash[currentId], function (trackArr, relType) {
				progToTag = progToTag.concat(trackArr);
			}, this)
			nodeArray[nodeHash[currentId]]["predecessor"] = true;
			tagged.push(currentId);
		}
		progToTag.shift();
	}
	
	
	return { nodes: nodeArray, links: linkArray };
};