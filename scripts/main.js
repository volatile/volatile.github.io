var downArrow, docLinks, docContent;

function ready(fn) {
	if (document.readyState != "loading") {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

function docExists(hash) {
	for (var i = 0; i < docLinks.length; i++) {
		if (docLinks[i].getAttribute("href") == hash) {
			return true;
		}
	}
	return false;
}

function loadDocContent(hash) {
	var request = new XMLHttpRequest();
	request.open("GET", "/doc/"+hash.substr(1)+".html", true);
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			docContent.innerHTML = this.response;

			var codes = document.querySelectorAll("pre code");
			for (var i = 0; i < codes.length; i++) {
				hljs.highlightBlock(codes[i]);
			}
		}
	};
	request.send();
}

ready(function () {
	downArrow = document.querySelector("header .down-arrow");
	docLinks = document.querySelectorAll(".doc .table-of-contents ol a");
	docContent = document.querySelector(".doc .content");

	// Down arrow
	window.onscroll = function () {
		if (this.pageYOffset > 200) {
			downArrow.style.opacity = 0;
		}
	};

	// Highlight.js
	hljs.initHighlighting();

	// Documentation
	if (docExists(window.location.hash)) {
		loadDocContent(window.location.hash);
	} else {
		loadDocContent(docLinks[0].getAttribute("href"));
	}
	for (var i = 0; i < docLinks.length; i++) {
		docLinks[i].onclick = function () {
			loadDocContent(this.getAttribute("href"));
		};
	}
});
