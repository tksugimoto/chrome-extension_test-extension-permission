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
	console.log(sender.url);
	console.table(message.data);
});
