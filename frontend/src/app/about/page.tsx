
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-[#071B2B]">

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left Column - Introduction */}
          <div className="flex flex-col items-start gap-6">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D5B779]">
              Harbour Island Marina of Seawaren
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              About
              <span className="block text-[#D5B779]">
                Harbour Island Marina
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#F4F7FA]">
              Harbour Island Marina is a marina located in Seawaren, New Jersey, run with the specific goal of providing boat maintenance,
              docking space, and a variety of other services for a maritime enthusiast. We have been operating since |YEAR| and growing ever since. We're a small but passionate team, dedicated to enjoying a 
              small aspect of our little world. TBC @ a later time.
            </p>
            <Link
              href="/help"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#D5B779] px-6 py-2 text-lg font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Need help, we got you.
              <span aria-hidden="true" className="ml-3">→</span>
            </Link>


          </div>

          {/* Right Column - Marina Image */}
          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-[#254357] md:min-h-[450px]">

            {/*Temporary TBC Later */}
            <Image
              src="/images/marina.jpg"
              alt="View of the marina and local waters..."
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

          </div>

        </div>

      </section>

    </main>
  );
}
