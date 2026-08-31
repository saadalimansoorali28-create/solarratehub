const JSON_HEADERS = {
  "content-type": "application/json; charset=UTF-8",
  "cache-control": "no-store"
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, "access-control-allow-origin": "*" }
  });
}

function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET,POST,OPTIONS",
        "access-control-allow-headers": "content-type"
      }
    });
  }

  if (!env.DB) {
    return json({ ok: false, error: "Comment database is not configured yet." }, 503);
  }

  try {
    if (request.method === "GET") {
      const article = clean(url.searchParams.get("article"), 200);
      if (!article) return json({ ok: false, error: "Missing article." }, 400);

      const result = await env.DB.prepare(
        "SELECT id, name, comment, created_at FROM comments WHERE article = ? AND status = 'approved' ORDER BY id DESC LIMIT 100"
      ).bind(article).all();

      return json({ ok: true, comments: result.results || [] });
    }

    if (request.method === "POST") {
      const body = await request.json();
      const article = clean(body.article, 200);
      const name = clean(body.name, 80);
      const comment = clean(body.comment, 2000);
      const email = clean(body.email, 254);
      const website = clean(body.website, 200); // honeypot

      if (website) return json({ ok: true, message: "Comment received." });
      if (!article || !name || !comment) {
        return json({ ok: false, error: "Name and comment are required." }, 400);
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return json({ ok: false, error: "Please enter a valid email address." }, 400);
      }

      await env.DB.prepare(
        "INSERT INTO comments (article, name, comment, email, status, created_at) VALUES (?, ?, ?, ?, 'approved', datetime('now'))"
      ).bind(article, name, comment, email || null).run();

      return json({ ok: true, message: "Comment published successfully." }, 201);
    }

    return json({ ok: false, error: "Method not allowed." }, 405);
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: "Unable to process the comment right now." }, 500);
  }
}
