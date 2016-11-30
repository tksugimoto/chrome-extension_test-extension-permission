(function () {
	"use strict";
	const data = Array.from(document.querySelectorAll("input, textarea")).map(elem => {
		return {
			tag: elem.tagName,
			type: elem.type,
			name: elem.name,
			value: elem.value
		};
	});
	chrome.runtime.sendMessage({data});
})();
