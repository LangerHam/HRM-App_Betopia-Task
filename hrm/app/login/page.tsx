"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/store/authSlice";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [mounted, setMounted] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: "1",
        name: "Teresa Lisbon",
        role: "HR Manager",
        email: email,
        avatar: "/professional-headshot.png",
      };

      dispatch(
        login({
          token: "mock-jwt-token-" + Date.now(),
          user: mockUser,
        })
      );

      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4",
        isDark ? "bg-gray-900" : "bg-gray-50"
      )}
    >
      <div
        className={cn(
          "w-full max-w-md rounded-lg border shadow-sm",
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        )}
      >
        <div className="text-center p-6 pb-4">
          <div
            className={cn(
              "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
              isDark ? "bg-gray-100" : "bg-gray-900"
            )}
          >
            <span
              className={cn(
                "text-xl font-bold",
                isDark ? "text-gray-900" : "text-white"
              )}
            >
              B
            </span>
          </div>
          <h1
            className={cn(
              "text-2xl font-semibold",
              isDark ? "text-gray-100" : "text-gray-900"
            )}
          >
            Welcome back
          </h1>
          <p
            className={cn(
              "text-sm mt-2",
              isDark ? "text-gray-400" : "text-gray-600"
            )}
          >
            Sign in to your Betopia Group account
          </p>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-b"
                }
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "border-b"
                }
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
