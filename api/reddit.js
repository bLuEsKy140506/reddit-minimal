// /api/reddit.js
const https = require("https");

module.exports = (req, res) => {
  const { postId } = req.query;

  if (!postId) {
    res.status(400).json({ error: "Missing postId query param" });
    return;
  }

  const url = `https://www.reddit.com/comments/${postId}.json`;

  https
    .get(url, (r) => {
      let data = "";
      r.on("data", (chunk) => (data += chunk));
      r.on("end", () => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");

        // Reddit sometimes returns 404/empty -> handle gracefully
        if (r.statusCode !== 200) {
          res
            .status(r.statusCode || 500)
            .json({ error: `Reddit returned ${r.statusCode}` });
        } else {
          res.status(200).send(data);
        }
      });
    })
    .on("error", (e) => {
      res.status(500).json({ error: String(e) });
    });
};
