// Getting toggle position (on/off)
tgl = document.querySelector("input");
chckd = tgl.hasAttribute("checked");

// Setting toggle position based on user preference
chrome.storage.sync.get(["buttonStatus"], function (item) {
  if (item.buttonStatus == "OFF") {
    tgl.removeAttribute("checked");
    chckd = false;
  } else {
    tgl.setAttribute("checked", true);
    chckd = true;
  }
});

// Adding eventListener logic - Toggling button on every click and saving user preference
tgl.addEventListener("click", () => {
  if (chckd == true) {
    tgl.removeAttribute("checked");
    chckd = false;
    chrome.storage.sync.set({ buttonStatus: "OFF" }, function () {
      console.log("Settings saved");
    });
  } else {
    tgl.setAttribute("checked", true);
    chckd = true;
    chrome.storage.sync.set({ buttonStatus: "ON" }, function () {
      console.log("Settings saved");
    });
  }
});
