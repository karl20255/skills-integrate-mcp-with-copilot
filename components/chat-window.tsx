"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef, useState } from "react"
import { Send, Snowflake } from "lucide-react"
import { ChatBubble } from "@/components/chat-bubble"
import { TypingIndicator } from "@/components/typing-indicator"

const SUGGESTIONS = [
  "What's on the menu?",
  "How much is a latte?",
  "What do you recommend?",
  "Do you have cold brew?",
]

function getText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("")
}

export function ChatWindow() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const isBusy = status === "submitted" || status === "streaming"

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
    setInput("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submit(input)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background/70 shadow-xl backdrop-blur">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card/80 px-5 py-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <Snowflake className="size-6" />
        </div>
        <div className="min-w-0">
          <h1 className="font-heading text-base font-semibold leading-tight text-foreground">
            Alpine Brew Coffee
          </h1>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-primary" />
            Carl is online &middot; usually replies instantly
          </p>
        </div>
      </header>

      {/* Scrollable chat history */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Snowflake className="size-7" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Hey, I&apos;m Carl!
            </h2>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Welcome to Alpine Brew Coffee. Ask me about our menu, prices, or what
              to order — I&apos;ll get you sorted before you even hit the lift line.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatBubble key={message.id} role={message.role === "user" ? "user" : "assistant"}>
            {getText(message.parts)}
          </ChatBubble>
        ))}

        {status === "submitted" && <TypingIndicator />}

        {error && (
          <div className="mx-auto max-w-sm rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
            Carl hit a snowdrift and couldn&apos;t respond. Please try again in a moment.
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-3 sm:px-6">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border bg-card/80 px-3 py-3 sm:px-4"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Carl…"
          aria-label="Type your message"
          className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus-visible:ring-2"
        />
        <button
          type="submit"
          disabled={!input.trim() || isBusy}
          aria-label="Send message"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  )
}
