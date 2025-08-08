"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { sidebarData } from "@/lib/data";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border bg-background border-border flex flex-col items-center justify-center gap-10">
      <div className="">=</div>
      <div className="w-full h-full justify-between items-center flex flex-col">
        <div className="w-full h-fit flex flex-col gap-4 items-center justify-center">
          {sidebarData.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.link}
                    className={`flex items-center gap-2 cursor-pointer rounded-lg p-2
                    ${pathname.includes(item.link) ? "iconBackground" : ""}
                    `}
                  >
                    <div
                      className={`${
                        pathname.includes(item.link) ? "" : "opacity-80"
                      }`}
                    >
                      {item.icon}
                    </div>
                  </Link>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
