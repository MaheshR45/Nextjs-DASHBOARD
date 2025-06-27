"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/components/custom/Loader";

type MessageType = Record<string, string | number | boolean | object | null>;

function InputFile() {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<{ [key: string]: any } | null>(null);
  const [isLoading,setIsLoading]=useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true)
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      setIsLoading(false)
      setResponseData(result);
    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }
    
      setResponseData({ error: "Upload failed: " + errorMessage });
    }
  };

  // Rendering only responseData.Message if available
  const renderMessage = (data: { [key: string]: MessageType }) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="flex flex-col sm:flex-row justify-between border-b py-2">
        <div className="font-semibold text-gray-700 dark:text-gray-300 capitalize w-full sm:w-1/3">
          {key}:
        </div>
        <div className="text-gray-900 dark:text-white w-full sm:w-2/3 break-words">
          {typeof value === "object" && value !== null
            ? JSON.stringify(value, null, 2) // show object/array as string for now
            : String(value)}
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-700 rounded-md p-8 flex flex-col gap-4 shadow-md">
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="picture">Select File</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      </div>

        <div className="bg-white dark:bg-gray-700 rounded-md p-8 mt-6 shadow-md">
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-b pb-2">
            Server Response - Message
          </h3>
          {isLoading?<Loader />:responseData?.Message?<div className="space-y-4">{renderMessage(responseData?.Message)}</div>:<div className="text-gray-500">No message available.</div>}
        </div>
    </>
  );
}

export default InputFile;
