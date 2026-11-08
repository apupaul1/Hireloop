import Banner from "@/components/Homepage/Banner";
import CallToAction from "@/components/Homepage/CallToAction";
import FeaturedJobs from "@/components/Homepage/FeaturedJobs";
import Features from "@/components/Homepage/Features";
import Pricing from "@/components/Homepage/Pricing";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <div className="relative isolate min-h-svh overflow-hidden bg-[#f5f5f7] text-neutral-900 dark:bg-[#050505] dark:text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80"
      >
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(ellipse_at_top_left,rgba(24,24,27,0.06),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent_65%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(24,24,27,0.06),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_65%)]" />
      </div>

      <Navbar />

      <Banner />
      <FeaturedJobs />
      <Features />
      <Pricing />
      <CallToAction />

      <Footer />
    </div>
  );
}
