'use client'

import TimingDisplay from "../Components/TimingDisplay";
import DateDisplay from "../Components/DateDisplay";
import Link from "next/link";
import { useState } from "react";
import Loading from "../Components/Loading";
import { useSession } from "next-auth/react";

function LandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
      <section className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            A simple day tracker
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-800 sm:text-6xl">
            Remember where your time goes.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
            Track My Day helps you quickly write down what you did, organize it
            into your own categories, and look back at your days without making
            planning feel like work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="ui-button rounded bg-gray-700 px-5 py-2.5 font-semibold text-white hover:bg-gray-800"
            >
              Start tracking
            </Link>
            <Link
              href="/login"
              className="ui-button rounded border border-gray-400 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="rounded-lg border-2 border-gray-300 bg-gray-100 p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold text-gray-700">Today</span>
            <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-500">
              4:00 - 8:00 P.M.
            </span>
          </div>
          <div className="space-y-3">
            {[
              ["8:00 - 8:30", "Walked outside", "health"],
              ["8:30 - 9:00", "Worked on a project", "career"],
              ["9:00 - 9:30", "Dinner with family", "food"],
            ].map(([time, activity, category]) => (
              <div
                key={time}
                className="rounded border border-gray-200 bg-white p-3"
              >
                <div className="text-xs text-gray-500">{time}</div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-gray-700">{activity}</span>
                  <span className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-600">
                    {category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Small notes add up to useful patterns.
          </p>
        </div>
      </section>

      <section className="mt-16 border-t border-gray-300 pt-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            [
              "Write it down",
              "Use simple half-hour slots to capture the things you actually did.",
            ],
            [
              "Make it yours",
              "Create categories that fit your life instead of forcing a template.",
            ],
            [
              "Look back",
              "See daily and weekly summaries to notice how your time is spent.",
            ],
          ].map(([title, description]) => (
            <div key={title}>
              <h2 className="font-semibold text-gray-800">{title}</h2>
              <p className="mt-2 leading-6 text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  const [selectedDates, setSelectedDates] = useState(new Date());
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") return <Loading />;
  if (sessionStatus === "unauthenticated") return <LandingPage />;

  return (
    <div>
      <DateDisplay
        selectedDate={selectedDates}
        setSelectedDate={setSelectedDates}
      />
      <TimingDisplay selectedDate={selectedDates} />
    </div>
  );
}
