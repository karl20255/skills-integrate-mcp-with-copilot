import { cn } from "@/lib/utils"
import { Mountain } from "lucide-react"

type ChatBubbleProps = {
  role: "user" | "assistant"
  children: React.ReactNode
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user"

  return (
    <div className={cn("flex w-full items-end gap-2.5", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
          aria-hidden="true"
        >
          <Mountain className="size-5" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm sm:max-w-[70%]",
          isUser
            ? "rounded-br-md bg-accent text-accent-foreground"
            : "rounded-bl-md bg-card text-card-foreground ring-1 ring-border",
        )}
      >
        <div className="whitespace-pre-wrap text-pretty">{children}</div>
      </div>

      {isUser && (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-sm ring-1 ring-border"
          aria-hidden="true"
        >
          <span className="text-xs font-semibold">You</span>
        </div>
      )}
    </div>
  )
}
