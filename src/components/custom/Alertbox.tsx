import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import { Dispatch, SetStateAction} from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface AlertDialogBoxProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
}

const AlertDialogBox: React.FC<AlertDialogBoxProps> = ({
  open,
  onOpenChange,
  title,
  description,
}) => {

  const router = useRouter();
 
  function handleLogOut(){
    router.push("/login")
  }
  

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[580px] p-8 bg-white dark:bg-[#1e1e1e] rounded shadow-[0px_6px_12px_0px_rgba(171,190,209,0.30)] dark:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.40)]">
          <DialogHeader className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <CircleCheck className="text-[#1B9C80]" />
              <DialogTitle className="text-gray-800 dark:text-white text-xl font-semibold font-['Poppins']">
                {title}
              </DialogTitle>
            </div>

            <DialogDescription className="text-gray-800 dark:text-gray-300 text-sm font-normal font-['Poppins']">
              {description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-4 mt-8">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              >
                Cancel
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                type="button"
                className="bg-[#4C9EAA] hover:bg-[#3e8c97] text-white"
                onClick={() =>{ onOpenChange(false) ; handleLogOut()}}
              >
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
    </>
  );
};

export default AlertDialogBox;
