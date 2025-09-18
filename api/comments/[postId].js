import fetch from "node-fetch";

export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    // 1. Request OAuth token
    const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      return res.status(tokenResponse.status).json({ error: `Reddit token error: ${errText}` });
    }

    const { access_token } = await tokenResponse.json();

    // 2. Fetch Reddit comments
    const redditRes = await fetch(`https://oauth.reddit.com/comments/${postId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    });

    if (!redditRes.ok) {
      const errText = await redditRes.text();
      return res.status(redditRes.status).json({ error: `Reddit API error: ${errText}` });
    }

    const data = await redditRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: error.message });
  }
}
