import { ApplicationsView } from "@/components/seeker/ApplicationsView";
import { getApplications } from "@/lib/api/applications";
import { getSession } from "@/lib/core/server";

const MyApplicationPage = async () => {
  const session = await getSession();
  const applications = await getApplications(`applicantId=${session?.user.id}`);

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
      <ApplicationsView applications={applications} />
    </div>
  );
};

export default MyApplicationPage;
