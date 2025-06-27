"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProfilePage = () => {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-md p-[32px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="pt-0 pb-2">
            <p className="mb-0 text-[16px] font-[600] text-[#47536F] dark:text-white">
              User Information
            </p>
          </AccordionTrigger>
          <AccordionContent className="text-[#333] dark:text-gray-300">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProfilePage;
