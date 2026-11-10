"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Euro,
  Globe2,
  MapPin,
} from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { postJob } from "@/lib/actions/jobs";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;
type JobType = (typeof JOB_TYPES)[number];

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
  "People & HR",
  "Other",
] as const;

const FREQUENCIES = ["per hour", "per month", "per year"] as const;
type Frequency = (typeof FREQUENCIES)[number];

type JobFormValues = {
  title: string;
  company: string;
  category: string;
  jobType: JobType;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: Frequency;
  responsibilities: string;
  qualifications: string;
};

type JobFormErrors = Partial<Record<keyof JobFormValues, string>>;

const initialValues: JobFormValues = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
};

const fieldClassName =
  "h-11 rounded-xl border-white/8 bg-[#15151a] px-3.5 text-sm text-white shadow-none outline-none transition-colors placeholder:text-white/30 focus-visible:border-[#5b5bd6]/70 focus-visible:ring-3 focus-visible:ring-[#5b5bd6]/20 dark:bg-[#15151a] dark:focus-visible:border-[#5b5bd6]/70";

const textareaClassName =
  "min-h-28 rounded-xl border-white/8 bg-[#15151a] px-3.5 py-3 text-sm leading-relaxed text-white shadow-none outline-none transition-colors placeholder:text-white/30 focus-visible:border-[#5b5bd6]/70 focus-visible:ring-3 focus-visible:ring-[#5b5bd6]/20 dark:bg-[#15151a] dark:focus-visible:border-[#5b5bd6]/70";

const numberInputClassName =
  "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const selectClassName = cn(
  fieldClassName,
  "w-full appearance-none pr-10 [&>option]:bg-[#17171c] [&>option]:text-white",
);

function RequiredMark() {
  return (
    <span aria-hidden className="text-[#8b8bf5]">
      *
    </span>
  );
}

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-5 items-center justify-center rounded-full border border-[#5b5bd6]/30 bg-[#5b5bd6]/15 text-[10px] font-semibold text-[#b4b4ff]">
        {step}
      </span>
      <h2 className="text-sm font-semibold tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}

function validateJobPost(values: JobFormValues): JobFormErrors {
  const errors: JobFormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Job title is required.";
  }

  if (!values.company.trim()) {
    errors.company = "Company name is required.";
  }

  if (!values.category) {
    errors.category = "Select a job category.";
  }

  if (!values.location.trim()) {
    errors.location = "Job location is required.";
  }

  if (!values.deadline) {
    errors.deadline = "Application deadline is required.";
  }

  const minSalary =
    values.minSalary.trim() === "" ? null : Number(values.minSalary);
  const maxSalary =
    values.maxSalary.trim() === "" ? null : Number(values.maxSalary);

  if (minSalary !== null && (!Number.isFinite(minSalary) || minSalary < 0)) {
    errors.minSalary = "Enter a valid minimum salary.";
  }

  if (maxSalary !== null && (!Number.isFinite(maxSalary) || maxSalary < 0)) {
    errors.maxSalary = "Enter a valid maximum salary.";
  }

  if (
    minSalary !== null &&
    maxSalary !== null &&
    Number.isFinite(minSalary) &&
    Number.isFinite(maxSalary) &&
    maxSalary < minSalary
  ) {
    errors.maxSalary = "Maximum salary must be greater than the minimum.";
  }

  if (!values.responsibilities.trim()) {
    errors.responsibilities = "Add the key responsibilities for this role.";
  }

  if (!values.qualifications.trim()) {
    errors.qualifications = "Add the qualifications for this role.";
  }

  return errors;
}

export default function JobPostForm() {
  const [values, setValues] = useState<JobFormValues>(initialValues);
  const [errors, setErrors] = useState<JobFormErrors>({});

  const setField = <K extends keyof JobFormValues>(
    name: K,
    value: JobFormValues[K],
  ) => {
    setValues((previous) => ({ ...previous, [name]: value }));

    setErrors((previous) => {
      if (!previous[name]) {
        return previous;
      }

      const next = { ...previous };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateJobPost(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      const element = document.getElementById(`job-${firstInvalidField}`);

      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      element?.focus();

      toast.add({
        type: "error",
        description: "Please fix the highlighted fields before publishing.",
      });

      return;
    }

    const data = await postJob(values);

    if (data.insertedId) {
      toast.add({
        type: "success",
        description: "Job published successfully.",
      });
      setValues(initialValues);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <section className="space-y-6">
        <SectionHeading step={1} title="Basic Information" />

        <div className="space-y-5">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="job-title">
              Job Title <RequiredMark />
            </FieldLabel>
            <Input
              id="job-title"
              name="title"
              type="text"
              autoComplete="off"
              placeholder="e.g. Frontend Developer"
              value={values.title}
              onChange={(event) => setField("title", event.target.value)}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "job-title-error" : undefined}
              className={fieldClassName}
              required
            />
            <FieldError id="job-title-error">{errors.title}</FieldError>
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field data-invalid={!!errors.company}>
              <FieldLabel htmlFor="job-company">
                Company Name <RequiredMark />
              </FieldLabel>
              <div className="relative">
                <Building2
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
                />
                <Input
                  id="job-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. HirePulse Network"
                  value={values.company}
                  onChange={(event) => setField("company", event.target.value)}
                  aria-invalid={!!errors.company}
                  aria-describedby={
                    errors.company ? "job-company-error" : undefined
                  }
                  className={cn(fieldClassName, "pl-10")}
                  required
                />
              </div>
              <FieldError id="job-company-error">{errors.company}</FieldError>
            </Field>

            <Field data-invalid={!!errors.category}>
              <FieldLabel htmlFor="job-category">
                Job Category <RequiredMark />
              </FieldLabel>
              <div className="relative">
                <select
                  id="job-category"
                  name="category"
                  value={values.category}
                  onChange={(event) => setField("category", event.target.value)}
                  aria-invalid={!!errors.category}
                  aria-describedby={
                    errors.category ? "job-category-error" : undefined
                  }
                  className={selectClassName}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {JOB_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-white/35"
                />
              </div>
              <FieldError id="job-category-error">{errors.category}</FieldError>
            </Field>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-white">
              Job Type <RequiredMark />
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {JOB_TYPES.map((jobType) => {
                const isSelected = values.jobType === jobType;

                return (
                  <label
                    key={jobType}
                    className={cn(
                      "flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-medium transition-colors select-none has-focus-visible:ring-3 has-focus-visible:ring-[#5b5bd6]/20",
                      isSelected
                        ? "border-[#5b5bd6] bg-[#5b5bd6]/10 text-white"
                        : "border-white/8 bg-[#15151a] text-white/50 hover:border-white/15 hover:text-white/75",
                    )}
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={jobType}
                      checked={isSelected}
                      onChange={() => setField("jobType", jobType)}
                      className="sr-only"
                    />
                    {jobType}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading step={2} title="Location, Compensation & Timeline" />

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-[#15151a] px-4 py-3.5">
          <label
            htmlFor="job-remote"
            className="flex flex-1 cursor-pointer items-start gap-3"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5b5bd6]/12 text-[#b4b4ff]">
              <Globe2 aria-hidden className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-medium text-white">
                Remote Work Allowed
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-white/40">
                Enable worldwide or distributed candidate applications
              </span>
            </span>
          </label>
          <Switch
            id="job-remote"
            name="isRemote"
            checked={values.isRemote}
            onCheckedChange={(checked) => setField("isRemote", checked)}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!errors.location}>
            <FieldLabel htmlFor="job-location">
              Job Location <RequiredMark />
            </FieldLabel>
            <div className="relative">
              <MapPin
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
              />
              <Input
                id="job-location"
                name="location"
                type="text"
                autoComplete="address-level2"
                placeholder="e.g. New York, USA"
                value={values.location}
                onChange={(event) => setField("location", event.target.value)}
                aria-invalid={!!errors.location}
                aria-describedby={
                  errors.location ? "job-location-error" : undefined
                }
                className={cn(fieldClassName, "pl-10")}
                required
              />
            </div>
            <FieldError id="job-location-error">{errors.location}</FieldError>
          </Field>

          <Field data-invalid={!!errors.deadline}>
            <FieldLabel htmlFor="job-deadline">
              Application Deadline <RequiredMark />
            </FieldLabel>
            <div className="relative">
              <CalendarDays
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
              />
              <Input
                id="job-deadline"
                name="deadline"
                type="date"
                value={values.deadline}
                onChange={(event) => setField("deadline", event.target.value)}
                aria-invalid={!!errors.deadline}
                aria-describedby={
                  errors.deadline ? "job-deadline-error" : undefined
                }
                className={cn(fieldClassName, "pl-10 scheme-dark")}
                required
              />
            </div>
            <FieldError id="job-deadline-error">{errors.deadline}</FieldError>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Field data-invalid={!!errors.minSalary}>
            <FieldLabel htmlFor="job-minSalary">Min Salary / Rate</FieldLabel>
            <div className="relative">
              <Euro
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
              />
              <Input
                id="job-minSalary"
                name="minSalary"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder="25"
                value={values.minSalary}
                onChange={(event) => setField("minSalary", event.target.value)}
                aria-invalid={!!errors.minSalary}
                aria-describedby={
                  errors.minSalary ? "job-minSalary-error" : undefined
                }
                className={cn(fieldClassName, numberInputClassName, "pl-10")}
              />
            </div>
            <FieldError id="job-minSalary-error">{errors.minSalary}</FieldError>
          </Field>

          <Field data-invalid={!!errors.maxSalary}>
            <FieldLabel htmlFor="job-maxSalary">Max Salary / Rate</FieldLabel>
            <div className="relative">
              <Euro
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-white/35"
              />
              <Input
                id="job-maxSalary"
                name="maxSalary"
                type="number"
                inputMode="decimal"
                min={0}
                step="any"
                placeholder="40"
                value={values.maxSalary}
                onChange={(event) => setField("maxSalary", event.target.value)}
                aria-invalid={!!errors.maxSalary}
                aria-describedby={
                  errors.maxSalary ? "job-maxSalary-error" : undefined
                }
                className={cn(fieldClassName, numberInputClassName, "pl-10")}
              />
            </div>
            <FieldError id="job-maxSalary-error">{errors.maxSalary}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="job-frequency">Frequency</FieldLabel>
            <div className="relative">
              <select
                id="job-frequency"
                name="frequency"
                value={values.frequency}
                onChange={(event) =>
                  setField("frequency", event.target.value as Frequency)
                }
                className={selectClassName}
              >
                {FREQUENCIES.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-white/35"
              />
            </div>
          </Field>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading step={3} title="Responsibilities & Requirements" />

        <Field data-invalid={!!errors.responsibilities}>
          <FieldLabel htmlFor="job-responsibilities">
            Key Responsibilities <RequiredMark />
          </FieldLabel>
          <Textarea
            id="job-responsibilities"
            name="responsibilities"
            rows={4}
            placeholder="Describe what this person will own, build, and collaborate on day to day."
            value={values.responsibilities}
            onChange={(event) =>
              setField("responsibilities", event.target.value)
            }
            aria-invalid={!!errors.responsibilities}
            aria-describedby={
              errors.responsibilities ? "job-responsibilities-error" : undefined
            }
            className={textareaClassName}
            required
          />
          <FieldError id="job-responsibilities-error">
            {errors.responsibilities}
          </FieldError>
        </Field>

        <Field data-invalid={!!errors.qualifications}>
          <FieldLabel htmlFor="job-qualifications">
            Qualifications & Requirements <RequiredMark />
          </FieldLabel>
          <Textarea
            id="job-qualifications"
            name="qualifications"
            rows={4}
            placeholder={
              "List the experience, skills, and education required.\n\n• 3+ years of relevant experience\n• Strong communication and collaboration skills"
            }
            value={values.qualifications}
            onChange={(event) => setField("qualifications", event.target.value)}
            aria-invalid={!!errors.qualifications}
            aria-describedby={
              errors.qualifications ? "job-qualifications-error" : undefined
            }
            className={textareaClassName}
            required
          />
          <FieldError id="job-qualifications-error">
            {errors.qualifications}
          </FieldError>
        </Field>
      </section>

      <div className="flex flex-col-reverse gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/35">
          Fields marked <span className="text-[#8b8bf5]">*</span> are required.
        </p>
        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-[#5b5bd6] px-6 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(91,91,214,0.8)] hover:bg-[#4b4bc0] sm:w-auto"
        >
          Publish Job
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </form>
  );
}
