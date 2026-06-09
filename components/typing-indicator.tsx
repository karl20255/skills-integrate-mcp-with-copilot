import { Mountain } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex w-full items-end gap-2.5 justify-start">
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
        aria-hidden="true"
      >
        <Mountain className="size-5" />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-card px-4 py-3.5 shadow-sm ring-1 ring-border">
        <div className="flex items-center gap-1" aria-label="Frostbite is typing">
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
