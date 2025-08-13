import React from "react";
import OnBoarding from "./_components/OnBoarding";
import FeatureCard from "./_components/FeatureCard";
import { Upload, Webcam } from "lucide-react";
import FeatureSectionLayout from "./_components/FeatureSectionLayout";

type Props = {};

const Pages = (props: Props) => {
  return (
    <div className="w-full mx-auto h-full">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-14">
        <div className="space-y-6">
          <h2 className="text-primary font-semibold text-4xl">
            Get maximum Conversion from your webinars
          </h2>
          <OnBoarding />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center">
          <FeatureCard
            Icon={<Upload className="w-10 h-10" />}
            heading="Browse or drag a pre-recorded webinar file"
            link="#"
          />
          <FeatureCard
            Icon={<Webcam className="w-10 h-10" />}
            heading="Browse or drag a pre-recorded webinar file"
            link="/webinars"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl bg-background-10">
        <FeatureSectionLayout
          heading="See how far along are your potential customers"
          link="/lead"
        />
      </div>
    </div>
  );
};

export default Pages;
