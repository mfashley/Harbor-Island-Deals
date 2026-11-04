
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
              Welcome to
              <span className="block text-[#D5B779]">
                Harbour Island Deals
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-[#F4F7FA]">
              Harbour Island Deals is a discount aggregation platform that collects all deals relating to maritime needs and
              delivers them in a simple, adaptable, and clean format. We have an automated system which will scan, collect, 
              verify all deals, along with a manual system that allows you to submit your own deals to our site. If you would like to save deals to use at a later time, 
              considering creating an account with us!
              
              <span className="block text-[#D5B779]">
              Brought to you by Harbour Island Marina.
              </span>
            </p>

            <Link
              href="/catalog"
              className="inline-flex min-h-14 items-center justify-center rounded-lg bg-[#D5B779] px-8 py-4 text-lg font-bold text-[#071B2B] transition-colors hover:bg-[#E7CB91] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore the Catalog.
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
