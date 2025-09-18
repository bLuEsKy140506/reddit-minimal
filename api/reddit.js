/**
 * Vercel Serverless Function (Node.js)
 * Acts as a CORS-friendly proxy to Reddit comments endpoint.
 *
 * Place this file under /api/reddit.js in the repo root for Vercel to pick up.
 *
 * Usage: GET /api/reddit?postId=<postId>
 */
const https = require('https')

module.exports = (req, res) => {
  const postId = req.query.postId
  if(!postId){
    res.status(400).json({ error: 'missing postId query param' })
    return
  }
  const url = `https://www.reddit.com/comments/${postId}.json`
  https.get(url, (r) => {
    let data = ''
    r.on('data', chunk => data += chunk)
    r.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'application/json')
      res.status(r.statusCode || 200).send(data)
    })
  }).on('error', (e) => {
    res.status(500).json({ error: String(e) })
  })
}
