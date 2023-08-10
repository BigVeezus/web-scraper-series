import * as cheerio from "cheerio";
import fetch from "node-fetch";

async function getOneFormulaOneDriver() {
  try {
    const response = await fetch("https://www.formula1.com/en/drivers.html");
    const body = await response.text();
    const $ = cheerio.load(body);

    const items = [];
    $(".listing-items--wrapper > .row > .col-12").map((i, el) => {
      const rank = $(el).find(".rank").text();
      const points = $(el).find(".points > .f1-wide--s").text();
      const firstName = $(el).find(".listing-item--name span:first").text();
      const lastName = $(el).find(".listing-item--name span:last").text();
      const team = $(el).find(".listing-item--team").text();
      const photo = $(el).find(".listing-item--photo img").attr("data-src");

      items.push({
        photo,
        rank,
        points,
        firstName,
        lastName,
        team,
      });
    });

    console.log(items);
  } catch (error) {
    console.log(error);
  }
}

getOneFormulaOneDriver();
