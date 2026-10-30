/**
 * Narration text: how a line is said (`speechText`), and comparing it with what a speech recogniser
 * heard: both are reduced to plain words, with numbers as digits, so "thirty-two" and "32" match.
 * Used by the build's narration and pronunciation check.
 */

/**
 * The text the voice reads. A capital A on its own is the letter (a vertex, as in "tan A" or
 * "triangle A B C"), which the voice would read as the article "a", so it is spelled as it sounds;
 * an A that starts a sentence and is followed by a lower-case word ("A ramp is…") is the article.
 */
export function speechText(say: string): string {
  const letters = say.replace(/\bA\b/g, (m, at: number) => {
    const sentenceStart = /(^|[.!?]\s+)$/.test(say.slice(0, at));
    const nextWord = /^\s+([a-z])/.test(say.slice(at + 1));
    return sentenceStart && nextWord ? m : 'Eh';
  });
  // Mnemonics in capitals would be spelled out letter by letter ("S-O-H"); say them as words.
  const words = letters
    .replace(/\bSOH CAH TOA\b/g, 'soh-cah-toa')
    .replace(/\b(SOH|CAH|TOA)\b/g, (m) => m[0] + m.slice(1).toLowerCase())
    // A lone letter with 's ("Route B's times") is garbled ("Route B to Cast times", "Store C2Ks"),
    // so the letter is spelled as it sounds. A is already "Eh" above.
    .replace(/\b([B-Z])(?=[’']s\b)/g, (l) => LETTER_NAMES[l]);
  // Words the voice gets wrong, respelled as they sound ("biweekly" comes out "boy-weekly", "deci"
  // as "Desai", "break-even" as "Bray-Keevan", "cosecant" as "co-second", "Aisha" as "Ah-shah",
  // "Kwame" as "Quam", "Jun" as "John", "Amedeo" (Avogadro) as "Aym-dee-oh", "GST" often as "GSD", "EI" as "I", "a chord bisects the
  // chord" as "a cord by sex the cord", "lengths" as "links"), "eighty-one" and "x-tiles" said
  // without their hyphens (with them, the voice blurs them into "A to 1" and "x styles"), and sizes like "eight-by-twelve", which run
  // together, said as separate words. The metal lead is always read as the verb ("leed"), so where it is
  // the metal (lead two nitrate, a sample of lead) it is spelled as it sounds; "lead to" and "a big lead" keep theirs.
  // Chemistry prefixes: "deca" alone and in "decahydrate" is stressed "dih-KA", "heptaoxide" runs its
  // vowels together ("hep-TOWK-side"), "pipetted" comes out "PIPE-uh-did", "electronegativity" loses its
  // "neg" ("electrong-gativity"), the chemist Svante Arrhenius is "Svant", and Le Chatelier is
  // "luh CHATE-lee-er". Organic names: "ethene" comes out "EE-theen" (heard as ethyne), "propene"
  // "pruh-PEEN", "propyne" "PRAH-pin", "ketone" "KET-own", "cycloalkane" without its "al", and
  // "methoxymethane" as "METH-ux-ime-thane". Names in the English videos: "Tybalt" comes out "TIE-balt",
  // "Wei" as "Why", "Teasdale" as "Tea-stale", "Montresor" as "Mon-tresser", "Petrarchan" with a
  // "ch" as in "church", "Désirée" as "Dess-er-ee", a sonnet's "volta" as "volt", "Dunsinane" as
  // "Dung-sening", "hamartia" as "ha-MAR-sha", the poet Countee Cullen as "County" and film's
  // "diegetic" sound without its first syllable ("dee-JET-ic"). In Hamlet, "Laertes" comes out "Lerts",
  // "Fortinbras" "Fortenborough's" and "quietus" "quietest"; Toulmin is "Tallman" and "Horatian"
  // satire "Hoo-ration".
  return words
    .replace(/\b([Ll])ead\b(?=\s*\(|\s(?:two|four|one|ions?|atoms?|nitrate|iodide|chloride|bromide|oxide|sulfate|sulfide|carbonate|hydroxide|acetate|or nitrate|has|in)\b)/g, '$1ed')
    .replace(/\b(of|as|and) lead\b/g, '$1 led')
    .replace(/\b(GST|HST|EI)\b/g, (m) => m.split('').join(' '))
    .replace(/\b([Bb])iweekly\b/g, '$1i-weekly')
    .replace(/\b([Bb])reak-even\b/g, '$1reak even')
    .replace(/\b([Dd])eci\b/g, '$1essy')
    .replace(/\b([Cc])osecant/g, '$1o-secant')
    .replace(/\b([Bb])isect/g, '$1i-sect')
    .replace(/\b([Ll])engths\b/g, '$1enkths')
    .replace(/\b([Ee]ighty)-(one|two|three|four|five|six|seven|eight|nine)\b/g, '$1 $2')
    .replace(/\b([A-Za-z])-(tiles?)\b/g, '$1 $2')
    .replace(/\bAisha\b/g, 'Ayesha')
    .replace(/\bKwame\b/g, 'Kwahmay')
    .replace(/\bJun\b/g, 'Joon')
    .replace(/\bAmedeo\b/g, 'Ama-day-o')
    .replace(/\bTybalt\b/g, 'Tibbalt')
    .replace(/\bWei\b/g, 'Way')
    .replace(/\bTeasdale\b/g, 'Teez-dale')
    .replace(/\bMontresor\b/g, 'Mon-treh-zor')
    .replace(/\bPetrarchan\b/g, 'Pet-trark-an')
    .replace(/Désirée/g, 'Dezzi-ray')
    .replace(/\b([Vv])olta(s?)\b/g, '$1ole-ta$2')
    .replace(/\bDunsinane\b/g, 'Dun-sin-ain')
    .replace(/\b([Hh])amartia\b/g, '$1a-mar-tee-a')
    .replace(/\bCountee\b/g, 'Countay')
    .replace(/\b([Dd])iegetic\b/g, '$1ye-a-jettic')
    .replace(/\bLaertes\b/g, 'Lay-air-teez')
    .replace(/\bFortinbras\b/g, 'Fortin-brass')
    .replace(/\bquietus\b/g, 'kwy-ee-tus')
    .replace(/\bToulmin\b/g, 'Tool-min')
    .replace(/\bHoratian\b/g, 'Horayshan')
    .replace(/\b([Dd])eca(?=\b|hydrate)/g, '$1ecka')
    .replace(/\b([Hh])eptaoxide/g, '$1epta-oxide')
    .replace(/\b([Pp])ipetted\b/g, '$1ih-petted')
    .replace(/\b([Ee])lectronegativ/g, '$1lectro-negativ')
    .replace(/\bSvante\b/g, 'Svahntay')
    .replace(/\bLe Ch[aâ]telier/g, 'Luh Shah-tell-yay')
    .replace(/\b([Ee])thene\b/g, '$1th-een')
    .replace(/\b([Pp])ropene\b/g, '$1ro-peen')
    .replace(/\b([Pp])ropyne\b/g, '$1ro-pine')
    .replace(/\b([Kk])etone/g, '$1ee-tone')
    .replace(/\b([Cc])ycloalk/g, '$1yclo-alk')
    .replace(/\b([Mm]eth|[Ee]th)oxy(meth|eth|prop)ane\b/g, '$1oxy-$2ane')
    .replace(/(\w)-by-(\w)/g, '$1 by $2');
}

const LETTER_NAMES: Record<string, string> = {
  B: 'Bee', C: 'See', D: 'Dee', E: 'Ee', F: 'Eff', G: 'Gee', H: 'Aitch', I: 'Eye', J: 'Jay', K: 'Kay', L: 'El', M: 'Em',
  N: 'En', O: 'Oh', P: 'Pee', Q: 'Cue', R: 'Ar', S: 'Ess', T: 'Tee', U: 'You', V: 'Vee', W: 'Double-you', X: 'Ex', Y: 'Why', Z: 'Zed',
};

const SMALL: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
};
const TENS: Record<string, number> = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
/** "three quarters" is 3 over 4. */
const PARTS: Record<string, number> = { half: 2, halves: 2, third: 3, thirds: 3, quarter: 4, quarters: 4, fourth: 4, fourths: 4, fifth: 5, fifths: 5, sixth: 6, sixths: 6, seventh: 7, sevenths: 7, eighth: 8, eighths: 8, ninth: 9, ninths: 9, tenth: 10, tenths: 10, twelfth: 12, twelfths: 12 };
const SAME: Record<string, string> = {
  sign: 'sine', signs: 'sines', cosign: 'cosine', centimeters: 'centimetres', centimeter: 'centimetre', meters: 'metres', meter: 'metre',
  kilometers: 'kilometres', cm: 'centimetres', m: 'metres', km: 'kilometres', degree: 'degrees', '°': 'degrees', okay: 'ok', percent: '%',
  cord: 'chord', cords: 'chords',
  // SOH CAH TOA as Whisper writes the spoken words.
  soh: 'so', cah: 'ka', kah: 'ka', katoa: 'ka toa', sohcahtoa: 'so ka toa',
};

/** Lower case, no punctuation, numbers as digits, single letters joined ("a c" → "ac"). */
export function normalise(text: string): string[] {
  const raw = text
    .toLowerCase()
    .replace(/(\d),(\d{3})/g, '$1$2')
    .replace(/\//g, ' over ')
    .replace(/[-–—]/g, ' ')
    .replace(/[^a-z0-9.%°' ]/g, ' ')
    .replace(/\.(?!\d)/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    // "x1" as Whisper writes "x one".
    .flatMap((w) => (/^[a-z]\d+$/.test(w) ? [w[0], w.slice(1)] : [w]))
    .flatMap((w) => (SAME[w] ?? w).split(' '));
  const out: string[] = [];
  let num: number | null = null;
  const flush = () => {
    if (num !== null) out.push(String(num));
    num = null;
  };
  for (let i = 0; i < raw.length; i++) {
    const w = raw[i];
    if (w in SMALL || w in TENS) {
      const v = SMALL[w] ?? TENS[w];
      num = num !== null && num % 10 === 0 && num >= 20 && v < 10 ? num + v : (flush(), v);
      continue;
    }
    if (w === 'hundred' && num !== null) {
      num *= 100;
      continue;
    }
    if (w === 'point' && num !== null && i + 1 < raw.length && raw[i + 1] in SMALL) {
      let s = `${num}.`;
      while (i + 1 < raw.length && raw[i + 1] in SMALL && SMALL[raw[i + 1]] < 10) s += SMALL[raw[++i]];
      out.push(s);
      num = null;
      continue;
    }
    if (w in PARTS && num !== null) {
      out.push(String(num), 'over', String(PARTS[w]));
      num = null;
      continue;
    }
    flush();
    out.push(w);
  }
  flush();
  // "a c" → "ac", so spelled-out side names match however Whisper writes them.
  const joined: string[] = [];
  let run = false;
  for (const w of out) {
    const letter = w.length === 1 && /[a-z]/.test(w);
    if (letter && run && w !== 'a') joined[joined.length - 1] += w;
    else {
      joined.push(w);
      run = letter;
    }
  }
  return joined;
}

/** Word error rate between what was meant and what was heard. */
export function wer(meant: string[], heard: string[]): number {
  const d = Array.from({ length: meant.length + 1 }, (_, i) => [i, ...Array<number>(heard.length).fill(0)]);
  for (let j = 1; j <= heard.length; j++) d[0][j] = j;
  for (let i = 1; i <= meant.length; i++) {
    for (let j = 1; j <= heard.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (meant[i - 1] === heard[j - 1] ? 0 : 1));
    }
  }
  return meant.length ? d[meant.length][heard.length] / meant.length : 0;
}
