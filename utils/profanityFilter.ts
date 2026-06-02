import { Filter } from 'bad-words';

const filter = new Filter();

const offensiveRoots = [
    'fuck',
    'fck',
    'fk',
    'fak',
    'shit',
    'bitch',
    'gay'
];

const bypassPatterns = [
    /f+u*c*k+/,
    /f+c*k+/,
    /f+x+c*k+/,
    /f+k+/,
    /s+h+i+t+/,
    /b+i+t+c+h+/
];

export function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[@4]/g, 'a')
      .replace(/[0]/g, 'o')
      .replace(/[1!]/g, 'i')
      .replace(/[3]/g, 'e')
      .replace(/[5]/g, 's')
      .replace(/[7]/g, 't')
      .replace(/[^a-z]/g, '');
};

export function containsOffensiveContent(text: string): boolean {
    const cleaned = normalizeText(text);

    const hasBadWord = cleaned
        ? filter.isProfane(cleaned)
        : false;

    const containsRoot = offensiveRoots.some(word =>
        cleaned.includes(word)
    );

    const matchesBypass = bypassPatterns.some(pattern =>
        pattern.test(cleaned)
    );

    return hasBadWord || containsRoot || matchesBypass;
}