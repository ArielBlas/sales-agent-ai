import { cn } from "@/lib/utils";
import { useWebinarStore, useWebinarStore } from "@/store/useWebinarStore";
import React from "react";

type Props = {};

const BasicInfoStep = (props: Props) => {
  const { formData, updateBasicField, getStepValidationErrors } =
    useWebinarStore();

  const errors = getStepValidationErrors("basicInfo");
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="webinarName"
          className={errors.webinarName ? "text-red-500" : ""}
        >
          Webinar name. <span className="text-red-500">*</span>
        </label>
        <input
          id="webinarName"
          name="webinarName"
          value={webinarName || ""}
          onChange={handleChange}
          placeholder="Introduction to Mochi"
          className={cn(
            "!bg-background/50 border border-input",
            errors.webinarName && "border-red-400 focus-visible:ring-red-400"
          )}
        />
        {errors.webinarName && (
          <p className="text-sm text-red-400">{errors.webinarName}</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;
