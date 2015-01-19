/* JSON response from server comes in as:

[ {type: 'SAMPLES', startNode: {track: [track JSON]}, endNode: {track: [track JSON]}}, {}, {}, ...]

*/

BT.Utils.ParseNodesAndLinks = function (data, trackId) {
	
	var nodeHash = {};
	var nodeArray = [];
	var linkHash = {};
	var linkArray = [];
	
	_(data).each ( function (respObj) {
		
		var startNodeId = respObj.startNode.track.id
		if (respObj.endNode != undefined) {
			var endNodeId = respObj.endNode.track.id;
		}
		if (respObj.type != undefined) {
			var relType = respObj.type;
		}
		
		//If start node has not been added to the nodes array, it adds it
		//while keeping track of its position in the array.
		if (nodeHash[startNodeId] === undefined) {
			nodeHash[startNodeId] = nodeArray.length;
			nodeArray.push(respObj.startNode.track);
		}
		
		//Does the same thing for the end node.
		
		if (endNodeId != undefined) {
		
			if (nodeHash[endNodeId] === undefined) {
				nodeHash[endNodeId] = nodeArray.length;
				nodeArray.push(respObj.endNode.track);
			}
		}
		//Creates a link if it hasn't been created already.  The linkHash
		//also keeps track of the predecessors of a particular track as such:
		// linkHash = {trackID : { samples: [pred1ID, pred2ID, ...], covers: [ ... ], ...} ... }
		if (relType != undefined) {
			
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
		}
		
	});
	
	//Tagging of progeny and predecessors will only occur if a current trackId is passed in.
	//(i.e. if the request comes from the trackshow page)
	if (trackId != undefined) {
		
		var predToTag = [];
		var tagged = [];
	
		//Initially populating the array of tracks to tag as predecessors
		_.each(linkHash[trackId], function (trackArr, relType) {
			predToTag = predToTag.concat(trackArr);
		}, this)
	
	
		while (predToTag.length > 0) {
			currentId = predToTag[0];
			if (tagged.indexOf(currentId) === -1) {
				_.each(linkHash[currentId], function (trackArr, relType) {
					predToTag = predToTag.concat(trackArr);
				}, this)
				nodeArray[nodeHash[currentId]]["predecessor"] = true;
				tagged.push(currentId);
			}
			predToTag.shift();
		}
	
		var progToTag = [];
		var pTagged = [];
	
	
		//Initially populating the array of tracks which are progeny of the current track 
		_.each(linkHash, function (predObj, hashId) {
			_.each(predObj, function (trackArr, relType) {
				if (trackArr.indexOf(trackId) != -1) {
					progToTag.push(hashId);
				}
			});
		});
	
		while (progToTag.length > 0) {
			var currentGroup = progToTag;
			progToTag = [];
		
			_.each(linkHash, function (predObj, hashId) {
				_.each(predObj, function (trackArr, relType) {
					_.each(trackArr, function (indId) {
						if (currentGroup.indexOf(indId) != -1) {
							progToTag.push(hashId);
						}
					});
				});
			});
		
			_.each(currentGroup, function(indId) {
				nodeArray[nodeHash[indId]]['progeny'] = true;
			});
		}
	}
	
	return { nodes: nodeArray, links: linkArray };
};