"use client";
import * as React from "react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DataTable } from "@/components/custom/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import DialogBox from "@/components/custom/Dialogbox";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const CarouselSpacing = () => {
  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "amount", header: "Amount" },
  ];

  const data: Payment[] = [
    { id: "728ed52f", amount: 100, status: "pending", email: "qqq@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
    { id: "828ed52f", amount: 150, status: "success", email: "m@example.com" },
    { id: "589e1d42", amount: 175, status: "failed", email: "example@gmail.com" },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
    { id: "828ed52f", amount: 150, status: "success", email: "m@example.com" },
    { id: "589e1d42", amount: 175, status: "failed", email: "example@gmail.com" },
    { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
    { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
    { id: "828ed52f", amount: 150, status: "success", email: "m@example.com" },
    { id: "589e1d42", amount: 175, status: "failed", email: "example@gmail.com" },
  ];

  const [openContactDialogBox, setOpenContactDialogBox] = useState(false);

  const handleContactUs = () => setOpenContactDialogBox(true);

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-white">Home</h1>

      <div className="text-center my-4 bg-white dark:bg-gray-700 rounded-md p-12">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Data to enrich your online business
        </h1>
        <p className="mt-8 text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <span
            onClick={handleContactUs}
            className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
          >
            Contact Us
          </span>
          <a href="#" className="text-sm/6 font-semibold text-gray-700 dark:text-white">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-md p-12 flex items-center justify-center">
        <Carousel className="w-full max-w-sm">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="text-center my-4 bg-white dark:bg-gray-700 rounded-md p-12">
        <DataTable columns={columns} data={data} filterColumn="email" />
      </div>

      <DialogBox open={openContactDialogBox} onOpenChange={setOpenContactDialogBox} />
    </div>
  );
};

export default CarouselSpacing;
