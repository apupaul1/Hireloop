import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CheckoutView } from "@/components/checkout/CheckoutView";
import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/lib/core/server";
import type { CheckoutPlanId } from "@/lib/checkout";

export const metadata: Metadata = {
  title: "Checkout — HireLoop",
  description:
    "Buy the one-time pass that matches your HireLoop account: an application pass for job seekers or a job post pack for recruiters.",
};

const CheckoutPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/signin");
  }

  // The role decides the product — a seeker can never buy the recruiter pack.
  const planId: CheckoutPlanId =
    session.user.role === "recruiter" ? "recruiter" : "seeker";

  return (
    <div className="relative isolate min-h-svh bg-[#f5f5f7] text-neutral-900 dark:bg-[#050505] dark:text-white">
      <Navbar />

      <CheckoutView planId={planId} />
    </div>
  );
};

export default CheckoutPage;
