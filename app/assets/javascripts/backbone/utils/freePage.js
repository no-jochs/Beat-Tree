BT.Utils.FreePage = function () {
	$('.modal').modal('hide');
	$('body').removeClass('modal-open');
	
	setTimeout( function () {
		$('.modal').modal('hide');
		$('body').removeClass('modal-open');
	}, 1);
}