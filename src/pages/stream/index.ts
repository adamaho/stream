import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  let timer: number;

  const body = new ReadableStream({
    start(controller) {
      timer = setInterval(() => {
        const message = `Hello World: ${new Date()}`;
        controller.enqueue(new TextEncoder().encode(message));
      }, 1000);
    },
    cancel() {
      console.log("client disconnected");
      clearInterval(timer);
    },
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain",
      "x-content-type-options": "nosniff",
    },
  });
};
