let counter = 0;

const markAd = function (listItem, reason) {
  const articleElements = listItem.children[0].children;
  // Removes article's subelements, leaving only an <h3>
  // Setting ' > 2 ' would leave price as well
  while (articleElements.length > 1) {
    articleElements[1].remove();
  }
  // Set ad name as title, so it shows up as tooltip when <h3> is hovered
  const a = articleElements[0].children[0];
  a.title = a.text;
  a.text = reason;
  counter += 1;
  console.log(`[${reason}] Oglas z naslovom: "${a.title}" izbrisan`);
};

const checkAds = function (settings) {
  const filterString = settings.filter || "";
  const filterKeywords = settings.keywords || false;
  const filterMerchants = settings.merchants || false;
  const filterBuying = settings.buying || false;
  const filterExposed = settings.exposed || false;

  // Select all ads
  const ads = document.querySelectorAll(
    ".EntityList-item--Regular, .EntityList-item--VauVau"
  );

  // Iterate each ad and delete unwanted ones
  ads.forEach((ad) => {
    const title = ad.children[0].children[0].children[0].innerHTML;

    // *
    // * Delete exposed ads (ads where users paid for exposure)
    // *
    if (filterExposed) {
      if (ad.className.includes("VauVau")) {
        markAd(ad, "IZPOSTAVLJEN");
        return;
      }
    }

    // *
    // * Delete ads by merchants
    // * Ads contain an <ul> displaying if ad has location/video/merchant
    // *
    if (filterMerchants) {
      // <ul class="feature-items">
      const ul =
        ad.children[0].getElementsByClassName("entity-features")[0].children[0]
          .children;
      let merchant = true;
      for (let i = 0; i < ul.length; i++) {
        const li = ul[i];
        if (li.innerText === "Uporabnik ni trgovec") merchant = false;
      }
      if (merchant) {
        markAd(ad, "TRGOVEC");
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
        markAd(ad, "KATEGORIJA KUPIM");
        return;
      }
    }

    // *
    // * Check if a filtered keyword is in the title
    // *
    if (filterKeywords && filterString !== "") {
      const lowercaseTitle = title.toLowerCase();
      const keywords = filterString.split(";");
      keywords.every((keyword) => {
        if (lowercaseTitle.includes(keyword)) {
          markAd(ad, `KEYWORD HIT ("${keyword}")`);
          return false;
        }
        return true;
      });
    }
  });

  // If no ads on the page, skip
  if (ads.length) {
    // Add warning for user about number of removed ads
    warning = document.createElement("h3");
    warning.textContent = `Število oglasov odstranjenih z Bolha Eliminatorjem: ${counter}`;
    warning.style.backgroundColor = "rgb(245, 196, 122)";
    warning.style.padding = "5px 5px 5px 8px";
    document.querySelector(".ContentHeader--alpha").appendChild(warning);
  }
};

browser.storage.local
  .get(["filter", "keywords", "merchants", "buying", "exposed"])
  .then(checkAds);

// *
// * Blurred ad unblurring
// *
const blurClass =
  ".wrap-content.ClassifiedDetail.ClassifiedDetail--blurContent.cf";
const blurredDiv = document.querySelector(blurClass);
if (blurredDiv) {
  browser.storage.local.get("blur").then((settings) => {
    // Keep only first class, others make it blurry
    if (settings.blur) blurredDiv.classList = blurredDiv.classList[0];
  });
}
