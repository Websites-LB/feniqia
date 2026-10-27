// A friendly transliteration into the Phoenician abjad, for the name stone on the home page.
// Phoenician wrote consonants only, right to left. Here a word-initial vowel becomes aleph,
// i/y keep yod and o/u keep waw (as later scribes did), and a and e simply drop away.

export type Letter = { glyph: string; name: string };

const L = {
  alep: "𐤀", bet: "𐤁", gaml: "𐤂", delt: "𐤃", he: "𐤄", wau: "𐤅", zai: "𐤆", het: "𐤇", tet: "𐤈", yod: "𐤉", kaf: "𐤊",
  lamd: "𐤋", mem: "𐤌", nun: "𐤍", semk: "𐤎", ain: "𐤏", pe: "𐤐", sade: "𐤑", qof: "𐤒", rosh: "𐤓", shin: "𐤔", tau: "𐤕",
} as const;
type Name = keyof typeof L;

// longest spellings first
const LATIN: [string, Name[]][] = [
  ["sh", ["shin"]], ["ch", ["shin"]], ["kh", ["het"]], ["th", ["tau"]], ["ph", ["pe"]], ["ts", ["sade"]],
  ["b", ["bet"]], ["c", ["kaf"]], ["d", ["delt"]], ["f", ["pe"]], ["g", ["gaml"]], ["h", ["he"]], ["j", ["gaml"]],
  ["k", ["kaf"]], ["l", ["lamd"]], ["m", ["mem"]], ["n", ["nun"]], ["p", ["pe"]], ["q", ["qof"]], ["r", ["rosh"]],
  ["s", ["semk"]], ["t", ["tau"]], ["v", ["wau"]], ["w", ["wau"]], ["x", ["kaf", "semk"]], ["y", ["yod"]], ["z", ["zai"]],
  ["i", ["yod"]], ["o", ["wau"]], ["u", ["wau"]],
];

// Arabic descends from the same family of scripts, so most letters have a direct ancestor.
const ARABIC: Record<string, Name> = {
  ا: "alep", أ: "alep", إ: "alep", آ: "alep", ء: "alep", ب: "bet", ج: "gaml", د: "delt", ذ: "delt", ه: "he", ة: "he",
  و: "wau", ز: "zai", ح: "het", خ: "het", ط: "tet", ظ: "tet", ي: "yod", ى: "yod", ك: "kaf", ل: "lamd", م: "mem",
  ن: "nun", س: "semk", ع: "ain", غ: "ain", ف: "pe", ص: "sade", ض: "sade", ق: "qof", ر: "rosh", ش: "shin", ت: "tau", ث: "tau",
};

const letter = (n: Name): Letter => ({ glyph: L[n], name: n });

function word(w: string): Letter[] {
  const out: Letter[] = [];
  let i = 0;
  while (i < w.length) {
    const ch = w[i];
    if (ARABIC[ch]) {
      out.push(letter(ARABIC[ch]));
      i++;
      continue;
    }
    if (ch === "a" || ch === "e") {
      if (i === 0) out.push(letter("alep"));
      i++;
      continue;
    }
    const hit = LATIN.find(([s]) => w.startsWith(s, i));
    if (hit) {
      hit[1].forEach((n) => out.push(letter(n)));
      i += hit[0].length;
    } else i++;
  }
  // doubled letters were written once
  return out.filter((l, k) => k === 0 || l.glyph !== out[k - 1].glyph);
}

/** Words of letters, in reading order (first letter first; display right to left). */
export function toPhoenician(text: string): Letter[][] {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .map(word)
    .filter((w) => w.length);
}
