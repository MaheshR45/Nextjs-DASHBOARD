"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Zod validation schema
const loginSchema = z.object({
  user_name: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  submittedCaptcha: z.string().min(1, "Captcha is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user_name: "",
      password: "",
      submittedCaptcha: "",
    },
  });

  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Captcha generation logic
  const generateCaptchaText = (length = 5) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const drawCaptcha = (text: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillStyle = "#111827";
    ctx.fillText(text, 10, 25);
  };

  const regenerateCaptcha = () => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptcha(newCaptcha);
    form.setValue("submittedCaptcha", "");
  };

  useEffect(() => {
    const captcha = generateCaptchaText();
    setCaptchaText(captcha);
    drawCaptcha(captcha);
  }, []);

  const onSubmit = (data: LoginData) => {
    if (data.submittedCaptcha !== captchaText) {
      form.setError("submittedCaptcha", { message: "Captcha does not match" });
      regenerateCaptcha();
      return;
    }

    console.log("✅ Form submitted successfully:", data);
    router.push("/home");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/your-background-image.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <p className="text-sm text-center text-gray-500 mb-4">
          Enter your credentials below
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Captcha */}
            <FormField
              control={form.control}
              name="submittedCaptcha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Captcha</FormLabel>
                  <FormControl>
                    <>
                      <Input placeholder="Enter captcha" {...field} />
                      <div className="flex items-center justify-between mt-2">
                        <canvas
                          ref={canvasRef}
                          width={120}
                          height={40}
                          className="rounded border bg-white"
                        />
                        <button
                          type="button"
                          onClick={regenerateCaptcha}
                          className="ml-2 text-sm text-blue-600 underline"
                        >
                          Refresh
                        </button>
                      </div>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
