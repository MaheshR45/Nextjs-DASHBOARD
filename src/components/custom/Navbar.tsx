"use client";

import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AlertDialogBox from "./Alertbox";
import { Heart, Moon, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useProductStore } from "@/store/useProductStore";
import { ProductSheet } from "./ProductSheet";

const Navbar: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const [sheetType, setSheetType]= useState(" ");
  const { setTheme } = useTheme();

  const now = new Date();
  const formatted = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // const favCount = useProductStore((state) => state.favItems.length);
  // const cartCount = useProductStore((state) => state.cartItems.length);

  // Also to get full arrays:
  const favItems = useProductStore((state) => state.favItems);
  const cartItems = useProductStore((state) => state.cartItems);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 dark:text-white border-b dark:border-gray-800">
      <div className="text-xl font-bold cursor-pointer">
        <Link href="/">Dashboard</Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" onClick={()=>{setIsProductSheetOpen(true);setSheetType("Favroutie")}}>
          <button className="text-gray-500 dark:text-white hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6 cursor-pointer" />
          </button>
          {favItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {favItems.length}
            </span>
          )}
        </div>

        <div className="relative" onClick={()=>{setIsProductSheetOpen(true);setSheetType("Cart")}}>
          <button className="text-gray-500 dark:text-white hover:text-red-500 transition-colors">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </button>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {cartItems.length}
            </span>
          )}
        </div>
        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsAccountOpen(true)}>
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Alert and Dialogs */}
        <AlertDialogBox
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Are you sure you want to logout?"
          description="You will be logged out of your session."
        />

        <ProductSheet
          open={isProductSheetOpen}
          onOpenChange={setIsProductSheetOpen}
          type={sheetType}
        />

        <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
          <DialogContent className="dark:bg-gray-950 dark:text-white">
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card className="dark:bg-gray-900 dark:text-white">
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you are
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@peduarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() =>
                        toast("Account has been Changed", {
                          description: formatted,
                          duration: 3000,
                          action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                          },
                        })
                      }
                    >
                      Save changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="password">
                <Card className="dark:bg-gray-900 dark:text-white">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password here. After saving, you will be
                      logged out.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() =>
                        toast("Password has been Changed", {
                          description: formatted,
                          duration: 3000,
                          action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                          },
                        })
                      }
                    >
                      Save password
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Navbar;
