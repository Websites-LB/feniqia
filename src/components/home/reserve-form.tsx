"use client";

import { useState } from "react";

import { waLink } from "@/lib/site";

const TIMES = ["9:00", "10:00", "11:00", "12:30", "13:30", "14:30", "17:00", "18:00", "19:00", "20:00", "20:30", "21:00", "21:30", "22:00"];

/** Bookings go to the restaurant on WhatsApp, pre-written, until an online booking system is chosen. */
export function ReserveForm() {
  const [f, setF] = useState({ name: "", date: "", time: "20:30", guests: "2", note: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Marhaba Feniqia! I'd like to book a table in Byblos.",
      `Name: ${f.name}`,
      `Date: ${f.date}`,
      `Time: ${f.time}`,
      `Guests: ${f.guests}`,
      f.note && `Occasion: ${f.note}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <form onSubmit={submit} className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="label text-stone">Name</span>
        <input required name="name" autoComplete="name" className="field mt-2" value={f.name} onChange={set("name")} />
      </label>
      <label>
        <span className="label text-stone">Date</span>
        <input required name="date" type="date" className="field mt-2" value={f.date} onChange={set("date")} />
      </label>
      <label>
        <span className="label text-stone">Time</span>
        <select name="time" className="field mt-2" value={f.time} onChange={set("time")}>
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="label text-stone">Guests</span>
        <select name="guests" className="field mt-2" value={f.guests} onChange={set("guests")}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9 or more"].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="label text-stone">Occasion, if any</span>
        <input name="note" className="field mt-2" value={f.note} onChange={set("note")} />
      </label>
      <div className="mt-2 sm:col-span-2">
        <button type="submit" className="btn btn-brass">
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
