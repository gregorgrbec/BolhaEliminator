deleteAd = function (settings) {
  const filterString = settings.filter || "";
  const keywords = filterString.split(";");
  const filterKeywords = settings.keywords || false;
  const filterMerchants = settings.merchants || false;
  const filterBuying = settings.buying || false;

  // Select all ads
  ads = document.querySelectorAll(
    ".EntityList-item--Regular, .EntityList-item--VauVau"
  );

  let counter = 0;

  // Iterate each ad and delete unwanted ones
  ads.forEach((ad) => {
    const title = ad.children[0].children[0].children[0].innerHTML;
    // *
    // * Delete ads by merchants
    // * Ads contain an <ul> displaying if ad has location/video/merchant
    // *
    if (filterMerchants) {
      // <ul class="feature-items">
      const ul = ad.children[0].children[6].children[0].children;
      let merchant = true;
      for (let i = 0; i < ul.length; i++) {
        const li = ul[i];
        if (li.innerText === "Uporabnik ni trgovec") merchant = false;
      }
      if (merchant) {
        ad.remove();
        counter += 1;
        console.log(`[TRGOVEC] Oglas z naslovom: "${title}" izbrisan`);
        return;
      }
    }

    // *
    // * Delete "buy" ads by targeting category visible in the URL (doesn't work on some old ads,
    // * because the category didn't yet exist)
    // *
    if (filterBuying) {
      const url = ad.children[0].children[0].children[0].href;
      if (url.includes("-kupim")) {
        ad.remove();
        counter += 1;
        console.log(`[KATEGORIJA KUPIM] Oglas z naslovom: "${title}" izbrisan`);
        return;
      }
    }

    // *
    // * Check if a filtered keyword is in the title
    // *
    if (filterKeywords) {
      const lowercaseTitle = title.toLowerCase();
      keywords.every((keyword) => {
        if (lowercaseTitle.includes(keyword)) {
          ad.remove();
          counter += 1;
          console.log(`[KEYWORD HIT] Oglas z naslovom: "${title}" izbrisan`);
          return false;
        }
        return true;
      });
    }
  });
  // Adding warning for user about number of removed ads
  warning = document.createElement("h3");
  warning.textContent = `Število oglasov odstranjenih z Bolha Eliminatorjem: ${counter}`;
  warning.style.backgroundColor = "rgb(245, 196, 122)";
  warning.style.padding = "5px 5px 5px 8px";

  document.querySelector(".ContentHeader--alpha").appendChild(warning);
};

browser.storage.local
  .get(["filter", "keywords", "merchants", "buying"])
  .then(deleteAd);
