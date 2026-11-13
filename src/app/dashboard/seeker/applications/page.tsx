import { ApplicationsView } from "@/components/seeker/ApplicationsView";
import { getApplications } from "@/lib/api/applications";

const MyApplicationPage = async () => {
  const applications = await getApplications();

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <ApplicationsView applications={applications} />
    </div>
  );
};

export default MyApplicationPage;
