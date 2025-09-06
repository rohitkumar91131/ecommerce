import getBase64 from "@/lib/getBase64";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing url" }),
        { status: 400 }
      );
    }

    const base64 = await getBase64(url);

    return new Response(
      JSON.stringify({ success: true, base64 }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 }
    );
  }
}
