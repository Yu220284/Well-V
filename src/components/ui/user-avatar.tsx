"use client"

import * as React from "react"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  className?: string
  size?: "sm" | "md" | "lg"
  userId?: string
}

const backgroundColors = [
  "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300", // 薄ピンク
  "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300", // 水色
  "bg-yellow-50 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300", // クリーム色
]

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10", 
  lg: "h-24 w-24"
}

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-12 w-12"
}

export function UserAvatar({ className, size = "md", userId }: UserAvatarProps) {
  // ユーザーIDまたはランダムで背景色を決定
  const colorIndex = userId 
    ? userId.charCodeAt(0) % backgroundColors.length 
    : Math.floor(Math.random() * backgroundColors.length)
  
  const bgColor = backgroundColors[colorIndex]
  
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full items-center justify-center",
        sizeClasses[size],
        bgColor,
        className
      )}
    >
      <User className={iconSizes[size]} />
    </div>
  )
}