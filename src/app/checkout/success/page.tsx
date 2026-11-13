import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  console.log(session);

  if (session.status === "open") {
    return redirect("/");
  }

  if (session.status === "open") {
    return redirect("/");
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return redirect("/checkout?canceled=1");
  }

  if (session.status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {session.customer_email}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }
}
