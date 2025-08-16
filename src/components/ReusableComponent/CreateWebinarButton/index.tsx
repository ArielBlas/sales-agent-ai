import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useWebinarStore } from "@/store/useWebinarStore";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

const CreateWebinarButton = (props: Props) => {
  const { isModalOpen, setModalOpen } = useWebinarStore();
  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger>
        <button
          className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2 border 
          border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20"
        >
          <PlusIcon />
          Create Webinar
        </button>
      </DialogTrigger>
    </Dialog>
  );
};

export default CreateWebinarButton;
