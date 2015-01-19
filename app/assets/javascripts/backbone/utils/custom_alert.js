//Diveloggr.Alert is just a custom alert dialogue.  It takes a header
//message, a body message, and an array of items (useful for validation errors)

BT.Alert = function () {
	this.render = function(header, message, items){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = '<h3>' + header + '</h3>';
	    document.getElementById('dialogboxbody').innerHTML = message;
		var errorlist = $('#customalertitems');
		_(items).each( function (item) {
			errorlist.append("<li>" + item + "</li>");
		})
		document.getElementById('dialogboxfoot').innerHTML = '<button type="button" class="btn-default btn" onclick="BT.currentCAlert.ok()">Dismiss</button>';
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
		$('#customalertitems').empty();
	}
}