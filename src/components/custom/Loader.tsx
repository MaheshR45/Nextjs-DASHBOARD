import { Loader2 } from "lucide-react";

export default function Loader() {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
        <span className="text-gray-700">Loading...</span>
      </div>
    </div>
  );
}
