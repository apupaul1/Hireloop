"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/api/jobs";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../ui/toast";
import { postApplication } from "@/lib/actions/applications";
import { getApplicationCount } from "@/lib/api/applications";

const ApplyNowButton = ({ job }: { job: Job }) => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleApply = async () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`);
      return;
    } else if (user.role === "seeker") {
      const { count } = await getApplicationCount(user.id);
      if (count > 3) {
        router.push("/checkout");
        toast.add({
          type: "error",
          description: "A Free User can apply up to 3 jobs",
        });
        return;
      } else {
        const application = {
          jobId: job._id,
          userId: user.id,
          email: user.email,
          jobTitle: job.title,
          companyName: job.company,
          jobType: job.jobType,
          isRemote: job.isRemote,
          location: job.location,
          minSalary: job.minSalary,
          maxSalary: job.maxSalary,
          salaryFrequency: job.frequency,
          deadline: job.deadline,
        };

        const data = await postApplication(application);

        if (data.insertedId) {
          toast.add({
            type: "success",
            description: "Application submitted successfully.",
          });
          setOpen(false);
        }
      }
    } else {
      toast.add({
        type: "error",
        description: "Only job Seeker can apply for job",
      });

      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            className="h-9 rounded-lg bg-neutral-900 px-4 text-[13px] font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            Apply Now
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Job Application?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to apply for <b>{job.title}</b>? Your profile
            and resume will be sent to the hiring team and this action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleApply}>
            Confirm & Apply
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApplyNowButton;
