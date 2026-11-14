import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SuccessView } from "@/components/checkout/SuccessView";
import { paymentVerification } from "@/lib/actions/payments";
import { CHECKOUT_PLANS, type CheckoutPlanId } from "@/lib/checkout";
import { getSession } from "@/lib/core/server";
import { stripe } from "@/lib/stripe";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Payment successful — HireLoop",
  description: "Your HireLoop pass is active.",
};

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  await paymentVerification(session_id);

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.status === "open") {
    return redirect("/");
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return redirect("/checkout?canceled=1");
  }

  const authSession = await getSession();

  const planId: CheckoutPlanId =
    authSession?.user.role === "recruiter" ? "recruiter" : "seeker";
  const plan = CHECKOUT_PLANS[planId];

  return (
    <>
      <Navbar />
      <SuccessView
        sessionId={session_id}
        amount={session.amount_total ?? plan.price * 100}
        dashboardHref={plan.dashboardHref}
      />
    </>
  );
}
