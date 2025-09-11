import PageHeader from "@/components/ReusableComponent/PageHeader";
import { HomeIcon, LeafIcon, PipetteIcon } from "lucide-react";
import React from "react";
import { getPipelineByWebinarId } from "@/actions/attendance";

type Props = {
  params: Promise<{ webinarId: string }>;
};

const page = async ({ params }: Props) => {
  const { webinarId } = await params;
  const pipelineData = await getPipelineByWebinarId(webinarId);

  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<LeafIcon className="w-4 h-4" />}
        mainIcon={<PipetteIcon className="w-12 h-12" />}
        rightIcon={<HomeIcon className="w-3 h-4" />}
        heading="Keep track of all of your customers"
        placeholder="Search Name, Tag or Email"
      />
      <div className="flex overflow-x-auto pb-4 gap-4 md:gap-6">
        {Object.entries(pipelineData.data).map(([columnType, columnData]) => (
          <PipelineLayout
            key={columnType}
            title={formatColumnTitle(columnType as AttendedTypeEnum)}
            count={columnData.count}
            users={columnData.users}
            tags={pipelineData.webinarTags}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
