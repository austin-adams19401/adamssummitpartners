import readingTime from 'reading-time';

export interface ReadingTimeStats {
  minutes: number;
  words: number;
  text: string;
}

/**
 * Compute reading time for a chunk of markdown or plain text.
 * Returns rounded-up minutes (minimum 1) plus word count.
 */
export function computeReadingTime(source: string): ReadingTimeStats {
  const stats = readingTime(source);
  const minutes = Math.max(1, Math.round(stats.minutes));
  return {
    minutes,
    words: stats.words,
    text: `${minutes} min read`,
  };
}
