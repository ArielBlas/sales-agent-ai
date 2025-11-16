import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateAssistantModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await CreateAssistantModal(name);
      if (!res.success) {
        throw new Error(res.message);
      }
      router.refresh();
      setName("");
      onClose();
      toast.success("Assistant created successfully");
    } catch (error) {
      toast.error("Failed to create assistant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-muted/80 rounded-lg w-full max-w-md p-6 border border-input shadow-xl">
        <h2 className="text-xl font-semibold">Create Assistant</h2>
        <button onClick={onClose} className="text-neutral-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-medium mb-2">Assistant Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter assistant name"
            className="bg-neutral-800 border-neutral-700"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAssistantModal;
