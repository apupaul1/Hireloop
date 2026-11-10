import JobPostForm from "@/components/recruiter/JobPostForm";

const AddJobPage = () => {
  return (
    <div className="w-full pb-10">
      <header className="mb-9">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          Post a New Job
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
          Fill in the position specifications to attract qualified talent across
          our network.
        </p>
      </header>
      <JobPostForm />
    </div>
  );
};

export default AddJobPage;
