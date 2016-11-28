(function () {
	"use strict";
	const data = Array.from(document.querySelectorAll("input, textarea")).map(elem => {
		return {
			tag: elem.tagName,
			type: elem.type,
			value: elem.value
		};
	});
	chrome.runtime.sendMessage({data});
})();
