export default {
  async fetch(request) {
    const allowedOrigins = [
      "https://stadiumsquare.densitygames.online",
      "https://ominous-telegram-xx5w9p76vwqcwq6-8000.app.github.dev"
    ];

    const origin = request.headers.get("Origin");
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "null",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const urls = {
      popcorn: "https://orderaway.com.au/austfootbleamarstadstadsq",
      drinksStation: "https://orderaway.com.au/ejabrhqiogsjchjhyojp",
      marathonDimSims: "https://orderaway.com.au/ktlnajtohbqavpdprbnf",
      butchersBlock: "https://orderaway.com.au/yzmzhrrxvgcxszexodri",
      earl: "https://orderaway.com.au/austfootbleamarstadearl",
      johnnieWalker: "https://orderaway.com.au/austfootbleamarstadjohwal",
      eightBit: "https://orderaway.com.au/austfootbleamarstad8bitst"
    };

    const target = `<div class="">Online ordering is currently disabled.</div>`;

    async function check(url) {
      try {
        const res = await fetch(url);
        if (!res.ok) return false;

        const html = await res.text();
        return html.includes(target);
      } catch (err) {
        return false;
      }
    }

    const results = {};
    for (const key in urls) {
      results[key] = await check(urls[key]);
    }

    return new Response(JSON.stringify(results, null, 2), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
