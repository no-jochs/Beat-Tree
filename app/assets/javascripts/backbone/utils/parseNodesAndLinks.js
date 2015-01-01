/* JSON response from server comes in as:

[ {type(r): 'SAMPLES', startNode(r): {...}, endNode(r): {...}}, {}, {}, ...]

*/

BT.Utils.ParseNodesAndLinks = function (data) {
	
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
		debugger
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
		//simply keeps track of wheather or not a link has been created so
		//no duplicates are created.
		
		var linkIndx = startNodeId + relType + endNodeId;
		
		if (linkHash[linkIndx] === undefined) {
			linkHash[linkIndx] = true;
			linkArray.push({
				"source": nodeHash[startNodeId],
				"target": nodeHash[endNodeId],
				"label": relType
			});
		}
	});
	
	debugger
	
	return { nodes: nodeArray, links: linkArray };
}