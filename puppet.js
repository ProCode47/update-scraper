const puppet = require("puppeteer");

const scrapeJobs = async () => {
  //launch puppet
  const browser = await puppet.launch({ headless: true });
  const page = await browser.newPage();

  // access page
  console.log("Accessing site");
  await page.goto(
    "https://ng.linkedin.com/jobs/search?keywords=Web%20Development&location=Nigeria&locationId=&geoId=105365761&f_TPR=r86400&position=1&pageNum=0"
  );
  await page.waitForTimeout(3000);
  console.log("Scraping...");

  // scrape page
  
  const data = await page.evaluate(() => {
    let scrapedList = [];
    const jobList = document.querySelectorAll(
      ".jobs-search__results-list > li"
    );
    Array.from(jobList).forEach((item) => {
      if (item.children[0].children.length === 2) {
        const link = item.children[0].href;
        const title = item.children[0].children[1].children[0].innerText;
        const employer = item.children[0].children[1].children[1].innerText;
        const location =  item.children[0].children[1].children[2].children[0].innerText;
        const job = { title, employer, location, link };
        scrapedList.push(job);
      } else {
        const link = item.children[0].children[0].href;
        const title = item.children[0].children[2].children[0].innerText;
        const employer = item.children[0].children[2].children[1].innerText;
        const location = item.children[0].children[2].children[2].children[0].innerText;
        const job = { title, employer, location, link };
        scrapedList.push(job);
      }
    });
    return scrapedList;
  });
  console.log("Done!")
  return data
  await browser.close();

}

module.exports = scrapeJobs

