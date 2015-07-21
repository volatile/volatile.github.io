function hashInDocTableOfContents(hash) {
	return $('.doc .table-of-contents ol a[href="'+hash+'"]').length > 0;
}


function loadDocContent(hash) {
	$.get('/doc/'+hash.substr(1)+'.html', function(data) {
		$('.doc .content').html(data);
		$('pre code').each(function(i, block) {
			hljs.highlightBlock(block);
		});
	});
}


$(document).ready(function() {

	// Init highlight.js
	hljs.initHighlighting();

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
