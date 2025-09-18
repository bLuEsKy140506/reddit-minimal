export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    const response = await fetch(`https://www.reddit.com/comments/${postId}.json`);
    const data = await response.json();

    // ✅ Fix CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
