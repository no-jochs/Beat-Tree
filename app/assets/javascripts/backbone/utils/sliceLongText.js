BT.Utils.SliceText = function (string, permittedLength) {
	if (string.length <= permittedLength) {
		return string;
	} else {
		if (string.indexOf(' ') === -1) {
			return string.slice(0, permittedLength) + '...';
		} else {
			var intermediate = string.slice(0, permittedLength);
			var reversed = intermediate.split("").reverse().join("");
			var newslice = reversed.indexOf(' ');
			return reversed.slice(newslice + 1).split("").reverse().join("") + "...";
		}

	}
	
}