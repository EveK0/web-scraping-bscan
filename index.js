import requestPromise from "request-promise";
import pkg, { zip } from "pythonic";
import cheerio from "cheerio";
const url = "https://bscscan.com/contractsVerified/1?ps=100";
requestPromise(url)
  .then(function (html) {
    const $ = cheerio.load(html, {
      xml: {
        xmlMode: true,
        withStartIndices: true,
        withEndIndices: false,
      },
    });
    const link = [];
    const contract_name = [];
    const compiler = [];
    const balance = [];
    for (let i = 0; i < 100; i++) {
      contract_name.push(
        $("tbody > tr > td:nth-child(2)", html)[i].firstChild.data
      );
      compiler.push($("tbody > tr > td:nth-child(3)", html)[i].firstChild.data);
      balance.push($("tbody > tr > td:nth-child(5)", html)[i].firstChild.data);

      link.push(
        $("#transfers > div > table > tbody > tr > td > a", html)[i].attribs
          .href
      );
    }

    for (const [name, compiler_name, balance_name, addr] of zip(
      contract_name,
      compiler,
      balance, 
      link
    )) {
      const contract_info = {
        address: addr,
        name_of_contract: name,
        compiler: compiler_name,
        balance: balance_name,
      };
      console.log(contract_info);
    }
  })
  .catch(function (err) {
    console.log(err);
  });
