import { useWebinarStore } from "@/store/useWebinarStore";
import React from "react";

type Props = {
  assistants: unknown[];
  stripeProducts: unknown[];
};

const CTAStep = (props: Props) => {
  const {
    formData,
    updateCTAField,
    addTag,
    removeTag,
    getStepValidationErrors,
  } = useWebinarStore();

  const { ctaLabel, tags, aiAgent, priceId, ctaType } = formData.cta;

  return <div>CTAStep</div>;
};

export default CTAStep;
