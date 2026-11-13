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

export const CHECKOUT_PLANS: Record<CheckoutPlanId, CheckoutPlan> = {
  seeker: {
    id: "seeker",
    audience: "For job seekers",
    name: "Application Pass",
    tagline:
      "Keep applying after your 3 free applications are used. One pass, every listing.",
    price: 15,
    perks: [
      "Unlimited applications on every listing",
      "Your profile, saved jobs, and history stay intact",
      "Activated on your account right after payment",
      "One-time payment — never billed again",
    ],
    successHref: "/browse-jobs",
    successLabel: "Browse more jobs",
    dashboardHref: "/dashboard/seeker",
    nextStep:
      "The application cap lifts immediately, so you can apply from any job page.",
  },
  recruiter: {
    id: "recruiter",
    audience: "For recruiters",
    name: "Job Post Pack",
    tagline:
      "Five extra job posts for teams that have used their free listings.",
    price: 29,
    perks: [
      "5 additional job posts",
      "Applicant tracking on every new listing",
      "Edit, pause, or close posts at any time",
      "One-time payment — never billed again",
    ],
    successHref: "/dashboard/recruiter/manage-jobs/new",
    successLabel: "Post a job",
    dashboardHref: "/dashboard/recruiter",
    nextStep:
      "Your 5 extra job posts are ready to use from your Manage Jobs page.",
  },
};

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
