// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// puppeteer.use(StealthPlugin());

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://z-lib.io/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector(
    ".g-page-content .container #searchFormWithLogo .b-search-input .input #searchFieldx"
  );
  await page.type(
    ".g-page-content .container #searchFormWithLogo .b-search-input .input #searchFieldx",
    "the sicilian",
    {
      delay: 200,
    }
  );
  await page.waitForSelector(
    ".g-page-content .container #searchFormWithLogo .b-search-input .button"
  );
  await page.click(
    ".g-page-content .container #searchFormWithLogo .b-search-input .button"
  );

  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
  //  await page.waitForResponse(
  //   (response) => response.url() === "https://z-lib.io/s/the%20sicilian?"

  // );

  // await page.waitForSelector(
  //   ".g-page-content .container #searchResultBox .resItemBox"
  // );
  // const matches = await page.$eval(
  //   ".g-page-content .container #searchResultBox .resItemBox .counter",
  //   (elem) => {
  //     return elem.innerHTML;
  //   }
  // );

  await page.waitForSelector(
    ".g-page-content .container #searchResultBox .resItemBox .resItemTable .bookRow [itemprop=name]"
  );
  const bookTitles = await page.$$eval(
    ".g-page-content .container #searchResultBox .resItemBox .resItemTable .bookRow [itemprop=name] a",
    (rows) => {
      return rows.map(function (title) {
        return title.innerHTML;
      });
    }
  );

  console.log(bookTitles);

  await browser.close();
})();
