import PageHeader from "@/components/ReusableComponent/PageHeader";
import { HomeIcon, LeafIcon, PipetteIcon } from "lucide-react";
import React from "react";

type Props = {
  params: Promise<{ webinarId: string }>;
};

const page = async ({ params }: Props) => {
  const { webinarId } = await params;

  return (
    <div className="w-full flex flex-col gap-8">
      <PageHeader
        leftIcon={<LeafIcon className="w-4 h-4" />}
        mainIcon={<PipetteIcon className="w-12 h-12" />}
        rightIcon={<HomeIcon className="w-3 h-4" />}
        heading="Keep track of all of your customers"
        placeholder="Search Name, Tag or Email"
      />
    </div>
  );
};

export default page;
