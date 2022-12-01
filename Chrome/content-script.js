deleteAd = function () {
  // Selecting all ads
  ads = document.querySelectorAll(
    ".EntityList-item--Regular, .EntityList-item--VauVau"
  );

  let counter = 0;

  // Iterating each ad and deleting unwanted ones
  ads.forEach((ad) => {
    title = ad.children[0].children[0].children[0].innerHTML.toLowerCase();

    if (
      title.includes("kupim") |
      title.includes("kupujem") |
      title.includes("kupujemo") |
      title.includes("odkup") |
      title.includes("odkupim") |
      title.includes("odkupimo") |
      title.includes("prodajaš") |
      title.includes("prodajate")
    ) {
      console.log(
        `Oglas z naslovom: ${ad.children[0].children[0].children[0].innerHTML} izbrisan`
      );
      ad.remove();
      counter += 1;
    }
  });

  // Adding warning for user about number of removed ads
  warning = document.createElement("h3");
  warning.textContent = `Število oglasov odstranjenih z Bolha Eliminatorjem: ${counter}`;
  warning.style.backgroundColor = "rgb(245, 196, 122)";
  warning.style.padding = "5px 5px 5px 8px";

  document.querySelector(".ContentHeader--alpha").appendChild(warning);
};

// Deleting ads if user enabled the option
chrome.storage.sync.get(["buttonStatus"], function (item) {
  if ((item.buttonStatus == "ON") | (item.buttonStatus == undefined)) {
    deleteAd();
  }
});
