import { Button } from "@/components/ui/button";
import { useAiAgentStore } from "@/store/useAiAgentStore";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateAssistant } from "@/actions/vapi";

type Props = {};

const ModelConfiguration = (props: Props) => {
  const { assistant } = useAiAgentStore();
  const [firstMessage, setFirstMessage] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      const res = await updateAssistant(
        assistant?.id,
        firstMessage,
        systemPrompt
      );

      if (!res.success) {
        throw new Error(res.message);
      }
      router.refresh();
      toast.success("Assistant updated successfully");
    } catch (error) {
      console.error("Error updating assistant:", error);
      toast.error("Failed to update assistant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFirstMessage(assistant?.firstMessage || "");
    setSystemPrompt(assistant?.model?.messages?.[0]?.content || "");
  }, [assistant]);

  if (!assistant) {
    return (
      <div className="flex justify-center items-center h-[500px] w-full">
        <div className="bg-neutral-900 rounded-xl p-6 w-full">
          <p className="text-primary/80 text-center">
            No assistant selected. Please select an assistant to configure the
            model settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Model</h2>
        <Button onClick={handleUpdateAssistant} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Updating...
            </>
          ) : (
            "Update Assistant"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ModelConfiguration;
