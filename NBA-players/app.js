import * as cheerio from "cheerio";
import fetch from "node-fetch";

async function getNBAPlayers() {
  try {
    const response = await fetch("https://www.nba.com/players");
    const body = await response.text();
    const $ = cheerio.load(body);

    const items = [];
    $(".PlayerList_playerTable__Jno0k").each((i, el) => {
      //   const name1 = $(el).find(".LeagueRoster_primaryCol__PsoRX").text();
      const name = $(el).find(".RosterRow_playerFirstName__NYm50");
      const teamAbb = $(el).find(
        ".players-list > tbody > tr > td:nth-child(2)"
      );
      const num = $(el).find(".players-list > tbody > tr > td:nth-child(3)");
      const pos = $(el).find(".players-list > tbody > tr > td:nth-child(4)");
      const feet = $(el).find(".players-list > tbody > tr > td:nth-child(5)");
      const photo = $(el).find(".RosterRow_playerHeadshot__tvZOn img");

      //   const firstName = $(el).find(".RosterRow_playerName__G28lg p:first");
      const name2 = $(el).find(".RosterRow_playerName__G28lg p:nth-child(2)");

      for (let i = 0; i < name.length; i++) {
        const firstName = $(name[i]).text();
        const lastName = $(name2[i]).text();
        const number = $(num[i]).text();
        const team = $(teamAbb[i]).text();
        const position = $(pos[i]).text();
        const height = $(feet[i]).text();
        const pic = $(photo[i]).attr("src");

        items.push({
          firstName,
          lastName,
          team,
          number,
          position,
          height,
          pic,
        });
      }
      console.log(items);
      //   console.log(photo);
      //   const tableRow = { selectName };

      //   console.log(selectName);
      //   console.log(selectName2);
    });
  } catch (error) {
    console.log(error);
  }
}

getNBAPlayers();
