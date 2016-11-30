const KEY = "inputData";
chrome.storage.local.get(KEY, ({inputData}) => {
	if (inputData) {
		console.table(inputData.data);

		$("page_title").innerText = `Title: ${inputData.page.title}`;
		$("page_url").innerText = `URL: ${inputData.page.url}`;

		inputData.data.filter(({tag, type}) => {
			return tag === "TEXTAREA" || /^(text|password)$/.test(type);
		}).forEach(({tag, type, name, value}) => {
			const tr = document.createElement("tr");

			if (tag === "TEXTAREA") {
				name = "(TEXTAREA)";
			}
			const td_name = document.createElement("td");
			td_name.innerText = name;
			tr.appendChild(td_name);


			const td_value = document.createElement("td");
			if (type === "password") {
				const len = value.length;
				const displayLength = 2;
				value = value.slice(0, displayLength) + "*".repeat(len - displayLength);
				td_value.title = "パスワード情報は3文字以降を*にしました"
			}
			td_value.innerText = value;
			tr.appendChild(td_value);

			$("input_data_tbody").appendChild(tr);
		});
	}
});

function $(id) {
	return document.getElementById(id);
}
