"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useWebinarStore } from "@/store/useWebinarStore";
import React from "react";

type Props = {};

const AdditionalInfoStep = (props: Props) => {
  const { formData, updateAdditionalInfoField, getStepValidationErrors } =
    useWebinarStore();
  const { lockChat, couponCode, couponEnabled } = formData.additionalInfo;

  const handleToggleLockChat = (checked: boolean) => {
    updateAdditionalInfoField("lockChat", checked);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="lock-chat" className="text-base font-medium">
            Lock Chat
          </Label>
          <p className="text-sm text-gray-400">
            Turn it on to make chat visible to your users at all time
          </p>
        </div>
        <Switch
          id="lock-chat"
          checked={lockChat || false}
          onCheckedChange={handleToggleLockChat}
        />
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
