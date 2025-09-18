export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    // 1. Get access token from Reddit
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
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      throw new Error(`Reddit token error ${tokenResponse.status}: ${errText}`);
    }

    const { access_token } = await tokenResponse.json();

    // 2. Use token to fetch comments
    const response = await fetch(`https://oauth.reddit.com/comments/${postId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "User-Agent": process.env.REDDIT_USER_AGENT,
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Reddit error ${response.status}: ${errText}`);
    }

    const data = await response.json();

    // ✅ Enable CORS (for frontend use)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Reddit API error:", error);
    res.status(500).json({ error: error.message });
  }
}
