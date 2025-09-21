"use client";
import React from "react";
import { User } from "@prisma/client";
import { useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";

type Props = {
  user: User;
};

const SubscriptionModal = ({ user }: Props) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-xl flex gap-2 items-center hover:cursor-pointer px-4 py-2
          border border-border bg-primary/10 backdrop-blur-sm text-sm font-normal text-primary hover:bg-primary-20"
        >
          <PlusIcon />
          Create Webinar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Spotlight Subscription</DialogTitle>
        </DialogHeader>
        <DialogFooter className="gap-4 items-center">
          <DialogClose
            className="w-full sm:w-auto border border-border rounded-md px-3 py-2"
            disabled={loading}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            // onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
