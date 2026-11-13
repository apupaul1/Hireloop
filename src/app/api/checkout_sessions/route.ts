import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const authSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = authSession?.user;

    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: `${user?.role === "seeker" ? "price_1UbM45PB6cdOKyeHymOumt0R" : "price_1UbMsRPB6cdOKyeHAuXeLeuf"}`,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user?.email,
      metadata: {
        userId: user?.id ?? null,
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      integration_identifier: "hire_loop_web_0001",
    });

    if (!session.url) {
      throw new Error("Checkout session URL is missing");
    }

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
