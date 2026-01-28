import express from "express";
const app = express();
const PORT = process.env.PORT || 10000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/*", async (req, res) => {
  const url = "https://api.kalshi.com/trade-api/v2" + req.originalUrl;
  try {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    res.status(r.status).set("Content-Type", "application/json").send(await r.text());
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.listen(PORT, () => console.log("Proxy running on " + PORT));
