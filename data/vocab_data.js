/**
 * EngMaster Master Vocabulary Database Aggregator
 * Aggregates Parts 1 to 5 into a seamless 2,500-word dataset
 */

window.VOCAB_DATA = [
  ...(window.VOCAB_PART1 || []),
  ...(window.VOCAB_PART2 || []),
  ...(window.VOCAB_PART3 || []),
  ...(window.VOCAB_PART4 || []),
  ...(window.VOCAB_PART5 || []),
  ...(window.VOCAB_PART6 || [])
];

console.log(`[EngMaster] Loaded ${window.VOCAB_DATA.length} core vocabulary words.`);
