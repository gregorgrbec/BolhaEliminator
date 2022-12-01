const keywordsInput = document.querySelector("#keywords");
const keywordsToggle = document.querySelector("#keywords-toggle");
const buyingToggle = document.querySelector("#buying-toggle");
const merchantsToggle = document.querySelector("#merchants-toggle");
const exposedToggle = document.querySelector("#exposed-toggle");
const saveButton = document.querySelector("#save");
const resetButton = document.querySelector("#reset");
const debug = document.querySelector("#debug");
const defaultFilterKeywords =
  "kupim;kupujem;kupujemo;odkup;odkupim;odkupimo;prodajaš;prodajate";

// *
// * Initialization of values
// *
browser.storage.local.get("filter").then((item) => {
  keywordsInput.value = item.filter || defaultFilterKeywords;
});

browser.storage.local.get("merchants").then((item) => {
  merchantsToggle.checked = item.merchants ??= false;
});

browser.storage.local.get("keywords").then((item) => {
  keywordsToggle.checked = item.keywords ??= false;
});

browser.storage.local.get("buying").then((item) => {
  buyingToggle.checked = item.buying ??= false;
});

// *
// * Element interaction listeners
// *
saveButton.addEventListener("click", (e) => {
  browser.storage.local.set({ filter: keywordsInput.value });
});

resetButton.addEventListener("click", (e) => {
  browser.storage.local
    .set({
      filter: defaultFilterKeywords,
    })
    .then(() => {
      browser.storage.local.get("filter").then((item) => {
        keywordsInput.value = item.filter;
      });
    });
});

keywordsToggle.addEventListener("change", (e) => {
  browser.storage.local.set({
    keywords: keywordsToggle.checked,
  });
});

merchantsToggle.addEventListener("change", (e) => {
  browser.storage.local.set({
    merchants: merchantsToggle.checked,
  });
});

buyingToggle.addEventListener("change", (e) => {
  browser.storage.local.set({
    buying: buyingToggle.checked,
  });
});
