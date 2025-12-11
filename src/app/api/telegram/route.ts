import type { NextRequest } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment variables");
}

export async function POST(req: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));

    const { name, email, message, meta } = body as {
      name?: string;
      email?: string;
      message?: string;
      meta?: Record<string, unknown>;
    };

    const textParts: string[] = [];

    if (name) textParts.push(`Имя: ${name}`);
    if (email) textParts.push(`Email: ${email}`);
    if (message) textParts.push(`Сообщение: ${message}`);
    if (meta && Object.keys(meta).length) {
      textParts.push("Meta:");
      textParts.push(JSON.stringify(meta, null, 2));
    }

    const text = textParts.length ? textParts.join("\n") : "Поступила новая заявка (пустое тело запроса)";

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    const tgJson = await tgResponse.json().catch(() => null);

    if (!tgResponse.ok || !tgJson?.ok) {
      console.error("Telegram API error", tgJson);
      return new Response(JSON.stringify({ error: "Failed to send message to Telegram" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("/api/telegram error", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
