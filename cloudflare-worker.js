addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const CORS_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: CORS_HEADERS,
    });
  }

  let payload;
  try {
    payload = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  const url = payload?.url;
  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing url' }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }

  try {
    const target = new URL(url);
    const response = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
    });

    const open = response.ok;
    return new Response(
      JSON.stringify({
        open,
        status: open ? 'open' : 'closed',
        statusCode: response.status,
      }),
      {
        status: 200,
        headers: CORS_HEADERS,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        open: false,
        status: 'closed',
        error: err.message,
      }),
      {
        status: 502,
        headers: CORS_HEADERS,
      }
    );
  }
}
