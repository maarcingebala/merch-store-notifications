export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { order } = req.body;

    if (!order || !order.number) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const message = {
      text: `🎉 New order created! Order #${order.number}`,
    };

    // Send message to Slack
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
