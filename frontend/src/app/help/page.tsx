
"use client";

import { useState } from "react";

export default function Help() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subject.trim() || !description.trim()) {
      return;
    }

    // Backend connection will go here later
    console.log({
      subject,
      description,
    });

    setSubmitted(true);
    setSubject("");
    setDescription("");
  };

  return (
    <main className="min-h-screen bg-[#071B2B]">

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left Column - FAQ (TBD) */}
          <div className="flex flex-col items-start gap-6">

            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              We're here to help!
              <span className="block text-[#D5B779]">
                What do you need?
              </span>
            </h1>


          </div>

          {/* Right Column - Contact Form */}
          <div className="relative rounded-2xl border border-[#254357] bg-[#0D293D] p-6 shadow-xl md:p-8">

            <h2 className="mb-2 text-2xl font-bold text-white">
              Submit a Request
            </h2>

            <p className="mb-8 text-sm text-[#B8C7D3]">
              Have a question or encountered an issue? 
              Let us know below.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Subject */}
              <div className="flex flex-col gap-2">

                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-white"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. Report a bug"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSubmitted(false);
                  }}
                  required
                  className="w-full rounded-lg border border-[#254357] bg-[#071B2B] px-4 py-3 text-white placeholder-[#B8C7D3] outline-none transition focus:border-[#D5B779]"
                />

              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">

                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-white"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Tell us a little more about what you need help with..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setSubmitted(false);
                  }}
                  rows={6}
                  required
                  className="w-full resize-y rounded-lg border border-[#254357] bg-[#071B2B] px-4 py-3 text-white placeholder-[#B8C7D3] outline-none transition focus:border-[#D5B779]"
                />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#1C6378] px-6 py-3 font-semibold text-white transition hover:bg-[#D5B779] hover:text-[#071B2B]"
              >
                Submit Request
              </button>

              {/* Success Message */}
              {submitted && (
                <p
                  role="status"
                  className="text-center text-sm font-medium text-[#D5B779]"
                >
                  Thank you! Your request has been submitted.
                </p>
              )}

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}
