$(document).ready(function() {

	addTriggers();
	//openFirst(); // Optional: open the pop-up of the first bullet on pageload

	
	function addTriggers() {
		$('.marker .bullet').on('mouseover', function() {
			showPopup($(this));
			console.log('test');
		}).on('mouseout', function() {
			hidePopup($(this).parents('.marker'));
		}).on('click', function(e) {
			e.preventDefault();

			var $marker = $(this).parents('.marker');

			if($marker.hasClass('fixed')) {
				$marker.removeClass('fixed');
				hidePopup($(this).parents('.marker'));
			} else {
				$marker.addClass('fixed');
			};
		});
	}

	function showPopup($bullet) {
		// check if there is enough space to show the popup on the right and the bottom
		var $marker = $bullet.parents('.marker'),
			mapWidth = $bullet.parents('.imageMap').width(),
			bulletPos = $marker.position().left,
			mapHeight = $bullet.parents('.imageMap').height(),
			bulletTopPos = $marker.position().top,
			popupHeight = $marker.children('.info').height();

		// 280: width bullet + width info popup
		if (mapWidth - bulletPos < 280) {
			$marker.addClass('markerLeft')
		}

		if (bulletTopPos + popupHeight > mapHeight) {
			$marker.addClass('markerTop').find('.info').css({'top' :  15 - popupHeight});
		}

		// show info popup
		$marker.children('.info').show();
		$marker.css({'z-index' : '9999'});
	}

	function hidePopup($marker) {
		// hide info pop-up
		if(!$marker.hasClass('fixed')) {
			$marker.children('.info').hide();
			$marker.css({'z-index' : '8888'});
		}
	}

	function openFirst() {
		// Show the pop-up of the first added marker on pageload
		var $firstMarker = $('.marker:first');
		$firstMarker.addClass('fixed');
		showPopup($firstMarker.children('.bullet'));
	}
});