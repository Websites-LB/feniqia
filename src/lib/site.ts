// Phone and WhatsApp come from the restaurant's Instagram bio ("Byblos 09540444 | WhatsApp 81540444").
// TODO(owner): confirm opening hours; Instagram only says "open daily".
export const SITE = {
  name: "Feniqia",
  phone: "9619540444",
  phoneDisplay: "+961 9 540 444",
  whatsapp: "96181540444",
  whatsappDisplay: "+961 81 540 444",
  street: "Old Souk",
  town: "Jbeil (Byblos), Lebanon",
  mapsQuery: "Feniqia restaurant, Old Souk, Byblos, Lebanon",
  hours: "Open daily",
  instagram: "https://www.instagram.com/feniqia_restaurant/",
  instagramHandle: "@feniqia_restaurant",
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

/** Byblos itself, wide enough for full-bleed (Unsplash, free licence). */
const u = (id: string, w = 2000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  souk: u("1722834258867-da53814b50d2", 2400),
  harbour: u("1571249246946-f0fc69085ef5"),
  ruins: u("1689069820230-71fd758df112", 1400),
  temple: u("1679031709273-a39cbec9b15f", 1400),
  castle: u("1679031709645-3812e10fafd0", 1400),
};

/** The restaurant's own photographs, saved from its public Instagram (October 2026). */
const ig = (id: string) => `/instagram/${id}.jpg`;

export const OWN = {
  makle: ig("DejBX90EbE9"),
  fattouch: ig("DerpbTHgLoB"),
  pans: ig("De84P_6kQaH"),
  grill: ig("DeRkRMKgJ3m"),
  wrap: ig("De1o6g0kdjK"),
  ade: ig("DeG0cVugMvf"),
  terrace: ig("DeXNT9ekSxx"),
  bell: ig("Dd_lJ2tDOn5"),
  sign: ig("Dewt_bwAuuN"),
  castle: ig("DbFioa3g7sU"),
  dusk: ig("DebxBoMAMa9"),
};

/** Their latest posts with their own captions. */
export const INSTAGRAM: { id: string; kind: "p" | "reel"; caption: string }[] = [
  { id: "DebxBoMAMa9", kind: "p", caption: "Where the heart of Byblos meets the soul of Lebanese hospitality." },
  { id: "DejBX90EbE9", kind: "p", caption: "The perfect weekend begins around the table." },
  { id: "Dewt_bwAuuN", kind: "reel", caption: "Open daily, in the heart of the Byblos souks." },
  { id: "De84P_6kQaH", kind: "p", caption: "The art of Lebanese dining, served your way." },
  { id: "DeRkRMKgJ3m", kind: "p", caption: "A taste of tradition, a setting like no other." },
  { id: "DbFioa3g7sU", kind: "reel", caption: "Where the charm of Byblos meets exceptional dining." },
  { id: "DerpbTHgLoB", kind: "p", caption: "A new week, the same Feniqia." },
  { id: "DeG0cVugMvf", kind: "p", caption: "Come for the flavours, stay for the Feniqia experience." },
  { id: "De1o6g0kdjK", kind: "p", caption: "Your cravings have a destination." },
  { id: "DeXNT9ekSxx", kind: "p", caption: "In the charm of Byblos, the pleasure of great food." },
  { id: "Dd_lJ2tDOn5", kind: "p", caption: "In the heart of Byblos. Rooted in Lebanese taste." },
];
