// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer (word) {
    word = word.toUpperCase();
    let letterPoints = "";
  
    for (let i = 0; i < word.length; i++) {
  
      for (const pointValue in oldPointStructure) {
  
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
  
      }
    }
    return letterPoints;
  }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   return input.question("Let's play some Scrabble! Enter a word: ");
};

let simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: function simpleScore(word) {
    return word.length;
  }
}

let vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scorerFunction: function vowelBonusScore(word) {
    word = word.toUpperCase();
    let score = 0;
    let vowels = ['A','E','I','O','U'];
    for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
        score = score + 3
      }
      else {
        score++
      }
    }
    return score;
  }
}

let scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: function scrabbleScore(word) {
    word = word.toUpperCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
      score = score + newPointStructure[word[i]];
    }
    return score;
  }
}

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
  let index = input.question(`Which scoring algorithm would you like to use?
  0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
  1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
  2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
  Enter 0, 1, or 2: `);
  return scoringAlgorithms[index];
}

function transform(object) {
  let pointStructure = {};
  for (key in object) {
    for (let i = 0; i < object[key].length; i++) {
       pointStructure[object[key][i]] = Number(key);
    }
  }
  return pointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let userWord = initialPrompt();
  userWord;
  let scoreAlgorithm = scorerPrompt();
  scoreAlgorithm;
  userScore = scoreAlgorithm.scorerFunction(userWord);
  console.log(`Score for \'${userWord}\': ${userScore}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

