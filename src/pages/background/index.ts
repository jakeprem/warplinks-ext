console.log("background script loaded");

// import { TinybaseBackend } from "@src/lib/TinybaseBackend";
import { DexieBackend } from "@src/lib/DexieBackend";

const Backend = DexieBackend;
console.log(Backend);

chrome.action.onClicked.addListener((tab) => {
  console.log("onClicked: ", tab);
});

chrome.omnibox.onInputStarted.addListener(async function () {
  console.log("onInputStarted");
  // chrome.omnibox.setDefaultSuggestion({
  //   description:
  //     "Here is a default <match>suggestion</match>. <url>It's <match>url</match> here</url>",
  // });
});

chrome.omnibox.onInputChanged.addListener(async function (text, suggest) {
  console.log("onInputChanged: ", text);

  const suggestions = await Backend.listCompletions(text).then((links) => {
    return links.map((link) => ({
      content: link.key,
      description: `${link.name}: ${link.description} (<url>${link.destination})</url>`,
    }));
  });

  suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener(async function (text, disposition) {
  console.log(
    `✔️ onInputEntered: text -> ${text} | disposition -> ${disposition}`
  );

  const url = await Backend.resolve(text);

  if (!url) {
    console.error("No URL found for key: ", text);
    return;
  }

  switch (disposition) {
    case "currentTab":
      await chrome.tabs.update({
        url,
      });
      break;
    case "newForegroundTab":
      await chrome.tabs.create({
        url,
      });
      break;
    case "newBackgroundTab":
      chrome.tabs.create({ url }, (tab) => {
        chrome.tabs.update(tab.id, { active: false });
      });
      break;
  }
});
