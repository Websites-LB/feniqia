"use client";

import { useState } from "react";

import { waLink } from "@/lib/site";

const TIMES = ["9:00", "10:00", "11:00", "12:30", "13:30", "14:30", "17:00", "18:00", "19:00", "20:00", "20:30", "21:00", "21:30", "22:00"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9 or more"];

const field =
  "mt-2 block min-h-[52px] w-full rounded-none border border-line bg-paper px-4 text-[1rem] text-ink outline-none transition-colors hover:border-ink/40 focus:border-ink";

/** Bookings go to the restaurant on WhatsApp, pre-written, until an online booking system is chosen. */
export function ReserveForm() {
  const [f, setF] = useState({ name: "", phone: "", date: "", time: "20:00", guests: "2", note: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Marhaba Feniqia, I'd like to book a table.",
      `Name: ${f.name}`,
      f.phone && `Phone: ${f.phone}`,
      `Date: ${f.date}`,
      `Time: ${f.time}`,
      `Guests: ${f.guests}`,
      f.note && `Notes: ${f.note}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <form onSubmit={submit} className="grid gap-x-5 gap-y-6 sm:grid-cols-3">
      <label>
        <span className="sign text-ink-soft">Date</span>
        <input required name="date" type="date" className={field} value={f.date} onChange={set("date")} />
      </label>
      <label>
        <span className="sign text-ink-soft">Time</span>
        <select name="time" className={field} value={f.time} onChange={set("time")}>
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        <span className="sign text-ink-soft">Guests</span>
        <select name="guests" className={field} value={f.guests} onChange={set("guests")}>
          {GUESTS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label className="sm:col-span-2">
        <span className="sign text-ink-soft">Full name</span>
        <input required name="name" autoComplete="name" className={field} value={f.name} onChange={set("name")} />
      </label>
      <label>
        <span className="sign text-ink-soft">Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set("phone")} />
      </label>
      <label className="sm:col-span-3">
        <span className="sign text-ink-soft">Occasion or request (optional)</span>
        <textarea name="note" rows={3} className={`${field} py-3`} value={f.note} onChange={set("note")} />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.88rem] text-ink-soft">Your request opens in WhatsApp, ready to send. We reply to confirm.</p>
        <button type="submit" className="btn btn-pome shrink-0">
          Request a table
        </button>
      </div>
    </form>
  );
}
