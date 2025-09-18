export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    // Fetch Reddit JSON with a custom User-Agent
    const response = await fetch(
      `https://www.reddit.com/comments/${postId}.json?limit=20`,
      {
        headers: {
          "User-Agent": "RedditMinimal/1.0 (by u/yourusername)", // 👈 important!
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reddit error ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
