import Image from "next/image"
import { ChatWindow } from "@/components/chat-window"
import { Coffee, MapPin } from "lucide-react"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-secondary/60 via-background to-background">
      <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_460px] lg:items-center lg:py-10">
        {/* Brand / lodge intro */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Coffee className="size-5" />
            <span className="tracking-wide">ALPINE BREW COFFEE</span>
          </div>

          <h1 className="font-heading text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Slope-side coffee, served with a warm welcome.
          </h1>

          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Fresh drip, lattes, and cold brew at the base of the mountain. Got a
            question before you drop in? Chat with Carl, our friendly (and slightly
            punny) support guy.
          </p>

          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <Image
              src="/lodge-hero.png"
              alt="Illustration of the Alpine Brew Coffee ski-lodge coffee shop at dusk"
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Coffee className="size-4 text-primary" />
              Drip $3 &middot; Latte $5 &middot; Cold Brew $4.50
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" />
              Base of the mountain
            </span>
          </div>
        </section>

        {/* Chat */}
        <section className="h-[600px] w-full lg:h-[640px]">
          <ChatWindow />
        </section>
      </div>
    </main>
  )
}
