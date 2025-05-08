export enum STATUS_ENUM {
  'Alive' = 1,
  'Dead' = 2,
  'unknown' = 3
}

export enum DIALOG_TYPE_ENUM {
  filter = 'filter',
  search = 'search'
}

export const STATUS_OPTIONS = [
  { key: 'Alive', value: 'Alive' },
  { key: 'Dead', value: 'Dead' },
  { key: 'unknown', value: 'Unknown' }
];

export enum LAYOUT_TYPE_ENUM {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile'

}

export const GENDER_OPTIONS = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
  { key: "Genderless", value: "Genderless" },
  { key: "Unknown", value: "Unknown" }
];

export type Option = { key: string; value: string };

// export const SPICIES_OPTIONS = [
//   {
//     "letter": "A",
//     "names": [
//       "Alien",
//       "Animal"
//     ]
//   },
//   {
//     "letter": "C",
//     "names": [
//       "Cronenberg"
//     ]
//   },
//   {
//     "letter": "D",
//     "names": [
//       "Disease"
//     ]
//   },
//   {
//     "letter": "H",
//     "names": [
//       "Human",
//       "Humanoid"
//     ]
//   },
//   {
//     "letter": "M",
//     "names": [
//       "Mythological Creature"
//     ]
//   },
//   {
//     "letter": "P",
//     "names": [
//       "Poopybutthole"
//     ]
//   },
//   {
//     "letter": "R",
//     "names": [
//       "Robot"
//     ]
//   },
//   {
//     "letter": "U",
//     "names": [
//       "Unknown"
//     ]
//   }
// ]
export const SPICIES_OPTIONS = [
  { key: 'Alien', value: 'Alien' },
  { key: 'Animal', value: 'Animal' },
  { key: 'Cronenberg', value: 'Cronenberg' },
  { key: 'Disease', value: 'Disease' },
  { key: 'Human', value: 'Human' },
  { key: 'Humanoid', value: 'Humanoid' },
  { key: 'Mythological Creature', value: 'Mythological Creature' },
  { key: 'Poopybutthole', value: 'Poopybutthole' },
  { key: 'Robot', value: 'Robot' },
  { key: 'Unknown', value: 'Unknown' }
];


// export const CHARACTER_TYPES = [
//   {
//     "letter": "A",
//     "names": [
//       "Alligator-Person",
//       "Alphabetrian",
//       "Amoeba-Person",
//       "Animal",
//       "Anime",
//       "Artificial Intelligence"
//     ]
//   },
//   {
//     "letter": "B",
//     "names": [
//       "Bepisian",
//       "Bird-Person",
//       "Bird-Person Human Mix",
//       "Blue ape alien",
//       "Boobie buyer reptilian",
//       "Boobloosian",
//       "Bread"
//     ]
//   },
//   {
//     "letter": "C",
//     "names": [
//       "Cat",
//       "Cat controlled dead lady",
//       "Cat-Person",
//       "Caterpillar",
//       "Centaur",
//       "Chair",
//       "Changeformer",
//       "CHUD",
//       "CHUD Human Mix",
//       "Clay-Person",
//       "Clone",
//       "Cone-nippled alien",
//       "Conjoined twin",
//       "Cookie",
//       "Corn-person",
//       "Cromulon",
//       "Cronenberg",
//       "Crow",
//       "Crow Horse",
//       "Cyborg"
//     ]
//   },
//   {
//     "letter": "D",
//     "names": [
//       "Decoy",
//       "Demon",
//       "Dog",
//       "Doopidoo",
//       "Dragon",
//       "Drumbloxian",
//       "Dummy"
//     ]
//   },
//   {
//     "letter": "E",
//     "names": [
//       "Eat shiter-Person",
//       "Eel",
//       "Elephant-Person"
//     ]
//   },
//   {
//     "letter": "F",
//     "names": [
//       "Ferkusian",
//       "Ferret Robot",
//       "Fish-Person",
//       "Flansian",
//       "Floop Floopian",
//       "Fly"
//     ]
//   },
//   {
//     "letter": "G",
//     "names": [
//       "Game",
//       "Garblovian",
//       "Gazorpian",
//       "Gazorpian reproduction robot",
//       "Gear-Person",
//       "Genetic experiment",
//       "Giant",
//       "Giant Cat Monster",
//       "Giant Incest Baby",
//       "Glorzo",
//       "God",
//       "Goddess",
//       "Gramuflackian",
//       "Grandma",
//       "Greebybobe",
//       "Gromflomite",
//       "Guinea Pig for the Polio Vaccine"
//     ]
//   },
//   {
//     "letter": "H",
//     "names": [
//       "Hairy alien",
//       "Half Soulless Puppet",
//       "Hammerhead-Person",
//       "Hivemind",
//       "Hole",
//       "Hologram",
//       "Human Gazorpian",
//       "Human with a flower in his head",
//       "Human with antennae",
//       "Human with ants in his eyes",
//       "Human with baby legs",
//       "Human with giant head",
//       "Human with tusks",
//       "Human-Snake hybrid"
//     ]
//   },
//   {
//     "letter": "I",
//     "names": [
//       "Interdimensional gaseous being"
//     ]
//   },
//   {
//     "letter": "J",
//     "names": [
//       "Jellybean"
//     ]
//   },
//   {
//     "letter": "K",
//     "names": [
//       "Korblock",
//       "Krootabulan"
//     ]
//   },
//   {
//     "letter": "L",
//     "names": [
//       "Larva alien",
//       "Leprechaun",
//       "Light bulb-Alien",
//       "Little Human",
//       "Lizard",
//       "Lizard-Person",
//       "Lobster-Alien"
//     ]
//   },
//   {
//     "letter": "M",
//     "names": [
//       "Mannie",
//       "Mascot",
//       "Meeseeks",
//       "Mega Gargantuan",
//       "Memory",
//       "Mexican",
//       "Microverse inhabitant",
//       "Miniverse inhabitant",
//       "Monogatron",
//       "Monster",
//       "Morglutzian",
//       "Morty's toxic side",
//       "Mytholog"
//     ]
//   },
//   {
//     "letter": "N",
//     "names": [
//       "Nano Alien",
//       "Narnian",
//       "Necrophiliac",
//       "Normal Size Bug",
//       "Numbericon"
//     ]
//   },
//   {
//     "letter": "O",
//     "names": [
//       "Octopus-Person",
//       "Old Amazons",
//       "Omniscient being",
//       "Organic gun"
//     ]
//   },
//   {
//     "letter": "P",
//     "names": [
//       "Parasite",
//       "Passing Butter Robot",
//       "Phone",
//       "Phone-Person",
//       "Pickle",
//       "Pizza",
//       "Planet",
//       "Plutonian",
//       "Pripudlian"
//     ]
//   },
//   {
//     "letter": "R",
//     "names": [
//       "Rat",
//       "Rick's toxic side",
//       "Ring-nippled alien",
//       "Robot",
//       "Robot-Crocodile hybrid"
//     ]
//   },
//   {
//     "letter": "S",
//     "names": [
//       "Scarecrow",
//       "Scrotian",
//       "Self-aware arm",
//       "Sentient ant colony",
//       "Sexy Aquaman",
//       "Shapeshifter",
//       "Shimshamian",
//       "Shrimp",
//       "Slartivartian",
//       "Slug",
//       "Snail alien",
//       "Snake",
//       "Soulless Puppet",
//       "Squid",
//       "Stair goblin",
//       "Starfish",
//       "Summon",
//       "Super Sperm Monster",
//       "Superhuman",
//       "Superhuman (Ghost trains summoner)"
//     ]
//   },
//   {
//     "letter": "T",
//     "names": [
//       "Teddy Bear",
//       "Teenyverse inhabitant",
//       "Tentacle alien",
//       "The Devil",
//       "Tiger",
//       "Time God",
//       "Tinymouth",
//       "Toy",
//       "Traflorkian",
//       "Trunk-Person",
//       "Tumblorkian",
//       "Turkey",
//       "Turkey Human Mix",
//       "Tuskfish"
//     ]
//   },
//   {
//     "letter": "U",
//     "names": [
//       "Unknown-nippled alien"
//     ]
//   },
//   {
//     "letter": "V",
//     "names": [
//       "Vampire"
//     ]
//   },
//   {
//     "letter": "W",
//     "names": [
//       "Wasp",
//       "Weasel",
//       "Whenwolf"
//     ]
//   },
//   {
//     "letter": "Z",
//     "names": [
//       "Zeus",
//       "Zigerion",
//       "Zombodian"
//     ]
//   }
// ]

export const CHARACTER_TYPES = [
  { key: 'Alligator-Person', value: 'Alligator-Person' },
  { key: 'Alphabetrian', value: 'Alphabetrian' },
  { key: 'Amoeba-Person', value: 'Amoeba-Person' },
  { key: 'Animal', value: 'Animal' },
  { key: 'Anime', value: 'Anime' },
  { key: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { key: 'Bepisian', value: 'Bepisian' },
  { key: 'Bird-Person', value: 'Bird-Person' },
  { key: 'Bird-Person Human Mix', value: 'Bird-Person Human Mix' },
  { key: 'Blue ape alien', value: 'Blue ape alien' },
  { key: 'Boobie buyer reptilian', value: 'Boobie buyer reptilian' },
  { key: 'Boobloosian', value: 'Boobloosian' },
  { key: 'Bread', value: 'Bread' },
  { key: 'CHUD', value: 'CHUD' },
  { key: 'CHUD Human Mix', value: 'CHUD Human Mix' },
  { key: 'Cat', value: 'Cat' },
  { key: 'Cat controlled dead lady', value: 'Cat controlled dead lady' },
  { key: 'Cat-Person', value: 'Cat-Person' },
  { key: 'Caterpillar', value: 'Caterpillar' },
  { key: 'Centaur', value: 'Centaur' },
  { key: 'Chair', value: 'Chair' },
  { key: 'Changeformer', value: 'Changeformer' },
  { key: 'Clay-Person', value: 'Clay-Person' },
  { key: 'Clone', value: 'Clone' },
  { key: 'Cone-nippled alien', value: 'Cone-nippled alien' },
  { key: 'Conjoined twin', value: 'Conjoined twin' },
  { key: 'Cookie', value: 'Cookie' },
  { key: 'Corn-person', value: 'Corn-person' },
  { key: 'Cromulon', value: 'Cromulon' },
  { key: 'Cronenberg', value: 'Cronenberg' },
  { key: 'Crow', value: 'Crow' },
  { key: 'Crow Horse', value: 'Crow Horse' },
  { key: 'Cyborg', value: 'Cyborg' },
  { key: 'Decoy', value: 'Decoy' },
  { key: 'Demon', value: 'Demon' },
  { key: 'Dog', value: 'Dog' },
  { key: 'Doopidoo', value: 'Doopidoo' },
  { key: 'Dragon', value: 'Dragon' },
  { key: 'Drumbloxian', value: 'Drumbloxian' },
  { key: 'Dummy', value: 'Dummy' },
  { key: 'Eat shiter-Person', value: 'Eat shiter-Person' },
  { key: 'Eel', value: 'Eel' },
  { key: 'Elephant-Person', value: 'Elephant-Person' },
  { key: 'Ferkusian', value: 'Ferkusian' },
  { key: 'Ferret Robot', value: 'Ferret Robot' },
  { key: 'Fish-Person', value: 'Fish-Person' },
  { key: 'Flansian', value: 'Flansian' },
  { key: 'Floop Floopian', value: 'Floop Floopian' },
  { key: 'Fly', value: 'Fly' },
  { key: 'Game', value: 'Game' },
  { key: 'Garblovian', value: 'Garblovian' },
  { key: 'Gazorpian', value: 'Gazorpian' },
  { key: 'Gazorpian reproduction robot', value: 'Gazorpian reproduction robot' },
  { key: 'Gear-Person', value: 'Gear-Person' },
  { key: 'Genetic experiment', value: 'Genetic experiment' },
  { key: 'Giant', value: 'Giant' },
  { key: 'Giant Cat Monster', value: 'Giant Cat Monster' },
  { key: 'Giant Incest Baby', value: 'Giant Incest Baby' },
  { key: 'Glorzo', value: 'Glorzo' },
  { key: 'God', value: 'God' },
  { key: 'Goddess', value: 'Goddess' },
  { key: 'Gramuflackian', value: 'Gramuflackian' },
  { key: 'Grandma', value: 'Grandma' },
  { key: 'Greebybobe', value: 'Greebybobe' },
  { key: 'Gromflomite', value: 'Gromflomite' },
  { key: 'Guinea Pig for the Polio Vaccine', value: 'Guinea Pig for the Polio Vaccine' },
  { key: 'Hairy alien', value: 'Hairy alien' },
  { key: 'Half Soulless Puppet', value: 'Half Soulless Puppet' },
  { key: 'Hammerhead-Person', value: 'Hammerhead-Person' },
  { key: 'Hivemind', value: 'Hivemind' },
  { key: 'Hole', value: 'Hole' },
  { key: 'Hologram', value: 'Hologram' },
  { key: 'Human Gazorpian', value: 'Human Gazorpian' },
  { key: 'Human with a flower in his head', value: 'Human with a flower in his head' },
  { key: 'Human with antennae', value: 'Human with antennae' },
  { key: 'Human with ants in his eyes', value: 'Human with ants in his eyes' },
  { key: 'Human with baby legs', value: 'Human with baby legs' },
  { key: 'Human with giant head', value: 'Human with giant head' },
  { key: 'Human with tusks', value: 'Human with tusks' },
  { key: 'Human-Snake hybrid', value: 'Human-Snake hybrid' },
  { key: 'Interdimensional gaseous being', value: 'Interdimensional gaseous being' },
  { key: 'Jellybean', value: 'Jellybean' },
  { key: 'Korblock', value: 'Korblock' },
  { key: 'Krootabulan', value: 'Krootabulan' },
  { key: 'Larva alien', value: 'Larva alien' },
  { key: 'Leprechaun', value: 'Leprechaun' },
  { key: 'Light bulb-Alien', value: 'Light bulb-Alien' },
  { key: 'Little Human', value: 'Little Human' },
  { key: 'Lizard', value: 'Lizard' },
  { key: 'Lizard-Person', value: 'Lizard-Person' },
  { key: 'Lobster-Alien', value: 'Lobster-Alien' },
  { key: 'Mannie', value: 'Mannie' },
  { key: 'Mascot', value: 'Mascot' },
  { key: 'Meeseeks', value: 'Meeseeks' },
  { key: 'Mega Gargantuan', value: 'Mega Gargantuan' },
  { key: 'Memory', value: 'Memory' },
  { key: 'Mexican', value: 'Mexican' },
  { key: 'Microverse inhabitant', value: 'Microverse inhabitant' },
  { key: 'Miniverse inhabitant', value: 'Miniverse inhabitant' },
  { key: 'Monogatron', value: 'Monogatron' },
  { key: 'Monster', value: 'Monster' },
  { key: 'Morglutzian', value: 'Morglutzian' },
  { key: "Morty's toxic side", value: "Morty's toxic side" },
  { key: 'Mytholog', value: 'Mytholog' },
  { key: 'Nano Alien', value: 'Nano Alien' },
  { key: 'Narnian', value: 'Narnian' },
  { key: 'Necrophiliac', value: 'Necrophiliac' },
  { key: 'Normal Size Bug', value: 'Normal Size Bug' },
  { key: 'Numbericon', value: 'Numbericon' },
  { key: 'Octopus-Person', value: 'Octopus-Person' },
  { key: 'Old Amazons', value: 'Old Amazons' },
  { key: 'Omniscient being', value: 'Omniscient being' },
  { key: 'Organic gun', value: 'Organic gun' },
  { key: 'Parasite', value: 'Parasite' },
  { key: 'Passing Butter Robot', value: 'Passing Butter Robot' },
  { key: 'Phone', value: 'Phone' },
  { key: 'Phone-Person', value: 'Phone-Person' },
  { key: 'Pickle', value: 'Pickle' },
  { key: 'Pizza', value: 'Pizza' },
  { key: 'Planet', value: 'Planet' },
  { key: 'Plutonian', value: 'Plutonian' },
  { key: 'Pripudlian', value: 'Pripudlian' },
  { key: 'Rat', value: 'Rat' },
  { key: "Rick's toxic side", value: "Rick's toxic side" },
  { key: 'Ring-nippled alien', value: 'Ring-nippled alien' },
  { key: 'Robot', value: 'Robot' },
  { key: 'Robot-Crocodile hybrid', value: 'Robot-Crocodile hybrid' },
  { key: 'Scarecrow', value: 'Scarecrow' },
  { key: 'Scrotian', value: 'Scrotian' },
  { key: 'Self-aware arm', value: 'Self-aware arm' },
  { key: 'Sentient ant colony', value: 'Sentient ant colony' },
  { key: 'Sexy Aquaman', value: 'Sexy Aquaman' },
  { key: 'Shapeshifter', value: 'Shapeshifter' },
  { key: 'Shimshamian', value: 'Shimshamian' },
  { key: 'Shrimp', value: 'Shrimp' },
  { key: 'Slartivartian', value: 'Slartivartian' },
  { key: 'Slug', value: 'Slug' },
  { key: 'Snail alien', value: 'Snail alien' },
  { key: 'Snake', value: 'Snake' },
  { key: 'Soulless Puppet', value: 'Soulless Puppet' },
  { key: 'Squid', value: 'Squid' },
  { key: 'Stair goblin', value: 'Stair goblin' },
  { key: 'Starfish', value: 'Starfish' },
  { key: 'Summon', value: 'Summon' },
  { key: 'Super Sperm Monster', value: 'Super Sperm Monster' },
  { key: 'Superhuman', value: 'Superhuman' },
  { key: 'Superhuman (Ghost trains summoner)', value: 'Superhuman (Ghost trains summoner)' },
  { key: 'Teddy Bear', value: 'Teddy Bear' },
  { key: 'Teenyverse inhabitant', value: 'Teenyverse inhabitant' },
  { key: 'Tentacle alien', value: 'Tentacle alien' },
  { key: 'The Devil', value: 'The Devil' },
  { key: 'Tiger', value: 'Tiger' },
  { key: 'Time God', value: 'Time God' },
  { key: 'Tinymouth', value: 'Tinymouth' },
  { key: 'Toy', value: 'Toy' },
  { key: 'Traflorkian', value: 'Traflorkian' },
  { key: 'Trunk-Person', value: 'Trunk-Person' },
  { key: 'Tumblorkian', value: 'Tumblorkian' },
  { key: 'Turkey', value: 'Turkey' },
  { key: 'Turkey Human Mix', value: 'Turkey Human Mix' },
  { key: 'Tuskfish', value: 'Tuskfish' },
  { key: 'Unknown-nippled alien', value: 'Unknown-nippled alien' },
  { key: 'Vampire', value: 'Vampire' },
  { key: 'Wasp', value: 'Wasp' },
  { key: 'Weasel', value: 'Weasel' },
  { key: 'Whenwolf', value: 'Whenwolf' },
  { key: 'Zeus', value: 'Zeus' },
  { key: 'Zigerion', value: 'Zigerion' },
  { key: 'Zombodian', value: 'Zombodian' }
];

export interface GroupedCharacterTypes {
  letter: string;
  names: string[];
}

// export function groupCharacterTypes(data: typeof SPICIES_OPTIONS): GroupedCharacterTypes[] {
//   const groups = data.reduce((acc, item) => {
//     const firstLetter = item.value[0].toUpperCase();

//     if (!acc[firstLetter]) {
//       acc[firstLetter] = [];
//     }

//     acc[firstLetter].push(item.value);
//     return acc;
//   }, {} as Record<string, string[]>);

//   return Object.keys(groups)
//     .sort()
//     .map(letter => ({
//       letter,
//       names: groups[letter].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
//     }));
// }
// const data = groupCharacterTypes(SPICIES_OPTIONS);
// console.log(data)