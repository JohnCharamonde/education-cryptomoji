'use strict';

const { createHash } = require('crypto');
const signing = require('./signing');

/**
 * A simple validation function for transactions. Accepts a transaction
 * and returns true or false. It should reject transactions that:
 *   - have negative amounts
 *   - were improperly signed
 *   - have been modified since signing
 */
const isValidTransaction = transaction => {
  // Enter your solution here
  if(transaction.amount < 0) return false;
  let src = transaction.source;
  let msg = transaction.source + transaction.recipient + transaction.amount;
  let sig = transaction.signature;
  if(!signing.verify(src, msg, sig)) return false;
  return true;
};

/**
 * Validation function for blocks. Accepts a block and returns true or false.
 * It should reject blocks if:
 *   - their hash or any other properties were altered
 *   - they contain any invalid transactions
 */
const isValidBlock = block => {
  // Your code here
  let properties = block.transactions.reduce((acc, transaction) => { return acc += transaction.toString(); }, '') + block.previousHash + block.nonce;
  let hash = createHash('sha256').update(properties).digest('hex');

  if(block.hash !== hash) return false;

  for(let i = 0; i < block.transactions.length; i++) {
    if(!isValidTransaction(block.transactions[i])) {
      return false;
    }
  }

  return true;
};

/**
 * One more validation function. Accepts a blockchain, and returns true
 * or false. It should reject any blockchain that:
 *   - is a missing genesis block
 *   - has any block besides genesis with a null hash
 *   - has any block besides genesis with a previousHash that does not match
 *     the previous hash
 *   - contains any invalid blocks
 *   - contains any invalid transactions
 */
const isValidChain = blockchain => {
  // Your code here

};

/**
 * This last one is just for fun. Become a hacker and tamper with the passed in
 * blockchain, mutating it for your own nefarious purposes. This should
 * (in theory) make the blockchain fail later validation checks;
 */
const breakChain = blockchain => {
  // Your code here

};

module.exports = {
  isValidTransaction,
  isValidBlock,
  isValidChain,
  breakChain
};
