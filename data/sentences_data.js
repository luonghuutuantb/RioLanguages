/**
 * EngMaster Master Conversational Sentences Aggregator
 * Aggregates Parts 1 to 3 into a seamless 1,000-sentence dataset
 */

window.SENTENCES_DATA = [
  ...(window.SENTENCES_PART1 || []),
  ...(window.SENTENCES_PART2 || []),
  ...(window.SENTENCES_PART3 || [])
];

console.log(`[EngMaster] Loaded ${window.SENTENCES_DATA.length} conversational sentences.`);
