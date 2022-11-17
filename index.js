import requestPromise from "request-promise";
import $ from "cheerio";
const url = "https://bscscan.com/contractsVerified/1?ps=100";

requestPromise(url)
  .then(function (html) {
    const link = [];
    for (let i = 0; i < 100; i++) {
      link.push(
        $("#transfers > div > table > tbody > tr > td > a", html)[i].attribs
          .href
      );
      console.log(link[i]);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
