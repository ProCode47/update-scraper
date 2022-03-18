const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const scraper = require('./puppet')

//Configuring Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/dev", async (req, res) => {
    const jobs = await scraper()
    res.json(jobs)
})

//Listen
app.listen(PORT, () => {
  console.log("Server is running...");
});
