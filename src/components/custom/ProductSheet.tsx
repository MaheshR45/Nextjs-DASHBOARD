import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { Product } from "../../app/products/page";
import { X } from "lucide-react";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export function ProductSheet({ open, onOpenChange, type }: SheetProps) {
  const favItems = useProductStore((state) => state.favItems);
  const cartItems = useProductStore((state) => state.cartItems);
  const toggleFav = useProductStore((state) => state.toggleFav);
  const toggleCart = useProductStore((state) => state.toggleCart);

  const products: Product[] = type === "Cart" ? cartItems : favItems;
  const totalCost = products.reduce((sum, item) => sum + Number(item.price), 0);

  const handleRemove = (product: Product) => {
    if (type === "Cart") {
      toggleCart(product);
    } else {
      toggleFav(product);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>{type === "Cart" ? "Cart" : "Favorite"} Items</SheetTitle>
          <SheetDescription>
            Check Your {type === "Cart" ? "Cart" : "Favorite"} List.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="w-full max-w-sm relative">
                {/* Cancel Icon */}
                <button
                  onClick={() => handleRemove(product)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>

                <CardHeader className="flex items-center justify-center">
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <Image
                    src="/protein1.jpg"
                    alt="protein"
                    className="object-cover rounded-full"
                    width={80}
                    height={80}
                  />
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <span className="font-semibold text-gray-800 dark:text-white">
                    ₹ {product.price}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <SheetFooter className="p-4 border-t">
          {type === "Cart" ? (
            <Button type="submit">Total cost: ₹ {totalCost}</Button>
          ) : (
            <Button type="submit">Save changes</Button>
          )}
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
