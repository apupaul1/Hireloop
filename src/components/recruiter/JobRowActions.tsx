"use client";

import {
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { useState } from "react";
import { deleteJob } from "@/lib/actions/jobs";
import { useRouter } from "next/navigation";

type JobRowActionsProps = {
  jobId: string;
  jobTitle: string;
};

export function JobRowActions({ jobId, jobTitle }: JobRowActionsProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const data = await deleteJob(id);

    if (data.deletedCount > 0) {
      setOpen(false);
      router.refresh();
      toast.add({
        type: "success",
        description: "Job deleted successfully",
      });
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/dashboard/recruiter/manage-jobs/update-job?id=${id}`);
  };

  const notify = (action: string) => {
    toast.add({
      type: "info",
      description: `${action} for "${jobTitle}" is not wired up to the API yet.`,
    });
  };

  return (
    <div data-job-id={jobId} className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => handleUpdate(jobId)}
        className="h-8 gap-1.5 rounded-lg border-[#5b5bd6]/40 bg-[#5b5bd6]/10 px-2.5 text-[11px] font-medium text-[#b4b4ff] shadow-none hover:border-[#5b5bd6]/60 hover:bg-[#5b5bd6]/20 hover:text-white active:translate-y-0"
      >
        <PencilIcon className="size-3.5" />
        Update
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 rounded-lg text-white/35 hover:bg-white/6 hover:text-red-300"
            >
              <Trash2Icon className="size-4" />
            </Button>
          }
        />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete job</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job. You cannot undo this
              action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              aria-label={`Delete ${jobTitle}`}
              onClick={() => handleDelete(jobId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`More actions for ${jobTitle}`}
          className="flex size-8 items-center justify-center rounded-lg text-white/35 transition-colors outline-none hover:bg-white/6 hover:text-white/75 focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/50"
        >
          <EllipsisVerticalIcon className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 border-none bg-[#17171c] p-1 text-white shadow-xl ring-white/10"
        >
          <DropdownMenuItem
            onClick={() => notify("Viewing details")}
            className="gap-2 py-1.5 focus:bg-white/6 focus:text-white"
          >
            <EyeIcon className="size-4 text-white/45" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleUpdate(jobId)}
            className="gap-2 py-1.5 focus:bg-white/6 focus:text-white"
          >
            <PencilIcon className="size-4 text-white/45" />
            Edit job
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/8" />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => handleDelete(jobId)}
            className="gap-2 py-1.5 focus:bg-red-500/10 focus:text-red-300"
          >
            <Trash2Icon className="size-4" />
            Delete job
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
