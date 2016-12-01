"use strict";

const ID_HARVEST_INPUT_TEXT = "a";

function createContextMenus() {
	chrome.contextMenus.create({
		title: "入力欄のテキストを収集するテスト",
		id: ID_HARVEST_INPUT_TEXT
	});
}

chrome.runtime.onInstalled.addListener(createContextMenus);
chrome.runtime.onStartup.addListener(createContextMenus);

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === ID_HARVEST_INPUT_TEXT) {
		chrome.tabs.executeScript(tab.id, {
			frameId: info.frameId,
			file: "harvest_input_text.js"
		});
	}
});


chrome.runtime.onMessage.addListener((message, sender) => {
	console.group("url: ", sender.url);
	console.log(sender.tab.title);
	console.table(message.data);
	console.groupEnd();

	chrome.storage.local.set({
		inputData: {
			page: {
				url: sender.url,
				title: sender.tab.title
			},
			data: message.data
		}
	}, () => {
		chrome.tabs.create({
			url: "popup_input.html"
		});
	});
});

chrome.browserAction.onClicked.addListener(tab => {
	console.log("browserAction.onClicked", tab);
	chrome.tabs.executeScript(tab.id, {
		file: "harvest_input_text.js"
	});
});
