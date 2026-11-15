export type CheckoutPlanId = "seeker" | "recruiter";

export type CheckoutPlan = {
  id: CheckoutPlanId;
  audience: string;
  name: string;
  tagline: string;
  price: number;
  perks: string[];
  successHref: string;
  successLabel: string;
  dashboardHref: string;
  nextStep: string;
};
