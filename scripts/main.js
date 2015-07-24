function hashInDocTableOfContents(hash) {
	return $('.doc .table-of-contents ol a[href="'+hash+'"]').length > 0;
}


function loadDocContent(hash) {
	$.get('/doc/'+hash.substr(1)+'.html', function(data) {
		$('.doc .content').fadeOut(100, function(argument) {
			// Replace content.
			$(this).html(data);
			// Set highlight.js on new content.
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		}).fadeIn(100);
	});
}


$(document).ready(function() {

	// Init highlight.js
	hljs.initHighlighting();

	$(window).scroll(function() {
		if ($(this).scrollTop() > 200) {
			$('header .down-arrow').css({
				opacity: 0
			});
		}
	});

	// Load documentation
	if (hashInDocTableOfContents(window.location.hash)) {
		loadDocContent(window.location.hash);
	} else {
		loadDocContent($('.doc .table-of-contents ol a').attr('href'));
	}

	$('.doc .table-of-contents ol a').click(function() {
		loadDocContent($(this).attr('href'));
	});

});
