// "use client";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import clsx from "clsx";
// import { Heart } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Product = {
//   id: string;
//   name: string;
//   price: string;
// };

// export default function UsersPage() {
//   const products = [
//     { id: "1", name: "Alice Johnson", price: "1000" },
//     { id: "2", name: "Bob Smith", price: "2000" },
//     { id: "3", name: "Charlie Rose", price: "3000" },
//     { id: "4", name: "Alice Johnson", price: "4000" },
//     { id: "5", name: "Bob Smith", price: "5000" },
//     { id: "6", name: "Charlie Rose", price: "6000" },
//   ];

//   const [favItems, setFavItems] = useState<Product[]>([]);
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   const addToFav = (data: Product) => {
//     setFavItems((prev) =>{
//       const isAlreadyFav=prev.some((item)=>item.id===data.id);
//       if(isAlreadyFav){
//         return prev.filter((item)=>item.id !=data.id)
//       }else{
//         return [...prev, data]
//       }
//     });
//   };

//   const addToCart = (data: Product) => {
//     setCartItems((prev) => {
//       const isAlreadyCart=prev.some((item)=>item.id===data.id)
//       if(isAlreadyCart){
//         return prev.filter((item)=>item.id!=data.id)
//       }else{
//         return [...prev, data]
//       }
//     });
//   };

//   const isInFav = (product:Product)=>favItems.some(item=>item.id===product.id)
//   const isInCart = (product:Product)=>cartItems.some(item=>item.id===product.id)

//   useEffect(() => {
//     console.log("fav items", favItems);
//     console.log("cart items", cartItems);
//   },[favItems,cartItems]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//         Products
//       </h1>

//       <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((items, index) => (
//           <Card key={index} className="w-full max-w-sm">
//             <CardHeader className="flex item-center justify-center">
//               <CardTitle>{items.name}</CardTitle>
//               {/* <CardDescription>Card Description</CardDescription> */}
//               {/* <CardAction>Card Action</CardAction> */}
//             </CardHeader>
//             <CardContent className="flex item-center justify-center">
//               <Image
//                 src="/protein1.jpg"
//                 alt="protein"
//                 className=" object-cover rounded-full"
//                 width={80}
//                 height={80}
//               />
//             </CardContent>
//             <CardFooter className="flex items-center justify-between">
//               <button
//                 onClick={() => addToFav(items)}
//                 className="text-gray-500 hover:text-red-500 transition-colors"
//               >
//                 <Heart className={`w-5 h-5 cursor-pointer ${isInFav(items)?"fill-red-500 stroke-red-500":"stroke-gray-500"}`} />
//               </button>
//               <button
//                 onClick={() => addToCart(items)}
//                 className={clsx("text-white text-sm px-3 py-1 rounded hover:bg-gray-500 transition-colors",isInCart(items)?"bg-red-400 hover:bg-red-500":"bg-gray-400 hover:bg-gray-500")}
//               >
//                 Add to Cart
//               </button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore";

export type Product = {
  id: string;
  name: string;
  price: string;
};

export default function UsersPage() {
  const products: Product[] = [
    { id: "1", name: "Whey protein", price: "1000" },
    { id: "2", name: "Creatin", price: "2000" },
    { id: "3", name: "Chacolate", price: "3000" },
    { id: "4", name: "Strawberry", price: "4000" },
    { id: "5", name: "Vanila", price: "5000" },
    { id: "6", name: "Apple", price: "6000" },
  ];

  const { favItems, cartItems, toggleFav, toggleCart, isInFav, isInCart } =
    useProductStore();

  useEffect(() => {
    console.log("fav items", favItems);
    console.log("cart items", cartItems);
  }, [favItems, cartItems]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="w-full max-w-sm">
            <CardHeader className="flex item-center justify-center">
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex item-center justify-center">
              <Image
                src="/protein1.jpg"
                alt="protein"
                className="object-cover rounded-full"
                width={80}
                height={80}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <button
                onClick={() => toggleFav(product)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={clsx(
                    "w-5 h-5 cursor-pointer",
                    isInFav(product)
                      ? "fill-red-500 stroke-red-500"
                      : "fill-gray-500 stroke-gray-500"
                  )}
                />
              </button>
              <span className="font-semibold text-gray-800 dark:text-white">
                ₹ {product.price}
              </span>
              <button
                onClick={() => toggleCart(product)}
                className="transition-colors"
              >
                <ShoppingCart
                  className={clsx(
                    "w-5 h-5 cursor-pointer transition-transform hover:scale-110",
                    isInCart(product)
                      ? "fill-red-500 stroke-red-500"
                      : "fill-gray-500 stroke-gray-500"
                  )}
                />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
