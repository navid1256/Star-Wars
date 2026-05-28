export interface StarWarsMovie {
  id: number;
  episode: number;
  title: string;
  subtitle: string;
  year: number;
  director: string;
  era: "Prequel" | "Original" | "Sequel" | "Spin-off";
  timelineYear: string;
  crawl: string;
  summary: string;
  keyEvents: string[];
  characters: string[];
  planets: string[];
  imageHint: string;
}

export const starWarsMovies: StarWarsMovie[] = [
  {
    id: 1,
    episode: 1,
    title: "The Phantom Menace",
    subtitle: "Every generation has a legend",
    year: 1999,
    director: "George Lucas",
    era: "Prequel",
    timelineYear: "32 BBY",
    crawl: "Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute.\n\nHoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.\n\nWhile the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....",
    summary: "The peaceful planet of Naboo is under siege by the Trade Federation. Two Jedi Knights, Qui-Gon Jinn and Obi-Wan Kenobi, are sent to negotiate but discover a sinister plot. They rescue Queen Amidala and flee to Tatooine, where they encounter a young slave boy named Anakin Skywalker — who has the highest midi-chlorian count ever recorded. Meanwhile, the Sith reveal themselves for the first time in a millennium as Darth Maul hunts the Jedi.",
    keyEvents: [
      "Trade Federation blockades Naboo",
      "Qui-Gon and Obi-Wan discover the Sith have returned",
      "Anakin Skywalker is discovered on Tatooine",
      "Podracing victory frees Anakin",
      "Darth Maul kills Qui-Gon Jinn",
      "Obi-Wan defeats Darth Maul and is knighted",
      "Anakin begins Jedi training",
      "Palpatine is elected Supreme Chancellor"
    ],
    characters: ["Qui-Gon Jinn", "Obi-Wan Kenobi", "Anakin Skywalker", "Padmé Amidala", "Palpatine", "Darth Maul", "Jar Jar Binks", "Mace Windu", "Yoda", "Shmi Skywalker"],
    planets: ["Naboo", "Tatooine", "Coruscant"],
    imageHint: "phantom-menace"
  },
  {
    id: 2,
    episode: 2,
    title: "Attack of the Clones",
    subtitle: "A Jedi shall not know anger",
    year: 2002,
    director: "George Lucas",
    era: "Prequel",
    timelineYear: "22 BBY",
    crawl: "There is unrest in the Galactic Senate. Several thousand solar systems have declared their intentions to leave the Republic.\n\nThis separatist movement, under the leadership of the mysterious Count Dooku, has made it difficult for the limited number of Jedi Knights to maintain peace and order in the galaxy.\n\nSenator Amidala, the former Queen of Naboo, is returning to the Galactic Senate to vote on the critical issue of creating an ARMY OF THE REPUBLIC to assist the overwhelmed Jedi....",
    summary: "Ten years after the events of The Phantom Menace, the galaxy stands on the brink of civil war. Anakin Skywalker, now a headstrong Jedi Padawan, is assigned to protect Senator Padmé Amidala from assassination attempts. Their assignment leads to forbidden love. Meanwhile, Obi-Wan discovers a secret clone army created for the Republic and uncovers the Separatist conspiracy led by Count Dooku — a former Jedi who has turned to the dark side.",
    keyEvents: [
      "Assassination attempts on Senator Amidala",
      "Anakin and Padmé fall in love on Naboo",
      "Obi-Wan discovers the clone army on Kamino",
      "Anakin slaughters the Tusken Raiders",
      "The Battle of Geonosis — first clash of the Clone Wars",
      "Count Dooku reveals himself as a Sith Lord",
      "Anakin and Padmé secretly marry"
    ],
    characters: ["Anakin Skywalker", "Obi-Wan Kenobi", "Padmé Amidala", "Count Dooku", "Mace Windu", "Yoda", "Jango Fett", "Boba Fett", "Palpatine", "C-3PO"],
    planets: ["Coruscant", "Naboo", "Kamino", "Geonosis", "Tatooine"],
    imageHint: "attack-clones"
  },
  {
    id: 3,
    episode: 3,
    title: "Revenge of the Sith",
    subtitle: "The saga ends",
    year: 2005,
    director: "George Lucas",
    era: "Prequel",
    timelineYear: "19 BBY",
    crawl: "War! The Republic is crumbling under attacks by the ruthless Sith Lord, Count Dooku. There are heroes on both sides. Evil is everywhere.\n\nIn a stunning move, the fiendish droid leader, General Grievous, has swept into the Republic capital and kidnapped Chancellor Palpatine, leader of the Galactic Senate.\n\nAs the Separatist Droid Army attempts to flee the besieged capital with their valuable hostage, two Jedi Knights lead a desperate mission to rescue the captive Chancellor....",
    summary: "The Clone Wars near their end, and the Sith's thousand-year plan reaches fruition. Chancellor Palpatine reveals himself as Darth Sidious and seduces Anakin Skywalker to the dark side with promises of saving Padmé from death. Mace Windu falls. Order 66 is executed, wiping out the Jedi across the galaxy. Obi-Wan confronts Anakin on Mustafar in a devastating duel that leaves Anakin burned and broken. Padmé dies giving birth to twins — Luke and Leia — who are hidden from the Empire. The Galactic Republic falls, and the Galactic Empire rises.",
    keyEvents: [
      "Rescue of Chancellor Palpatine and death of Count Dooku",
      "Palpatine reveals himself as Darth Sidious",
      "Anakin falls to the dark side and becomes Darth Vader",
      "Order 66 — the Great Jedi Purge begins",
      "Obi-Wan battles Anakin on Mustafar",
      "Padmé dies after giving birth to twins",
      "Luke and Leia are separated and hidden",
      "The Galactic Empire is declared",
      "Darth Vader is encased in his iconic suit"
    ],
    characters: ["Anakin Skywalker / Darth Vader", "Obi-Wan Kenobi", "Padmé Amidala", "Palpatine / Darth Sidious", "Mace Windu", "Yoda", "General Grievous", "Bail Organa", "Luke Skywalker (infant)", "Leia Organa (infant)"],
    planets: ["Coruscant", "Mustafar", "Utapau", "Kashyyyk", "Polis Massa", "Alderaan", "Tatooine"],
    imageHint: "revenge-sith"
  },
  {
    id: 4,
    episode: 4,
    title: "A New Hope",
    subtitle: "The story that started it all",
    year: 1977,
    director: "George Lucas",
    era: "Original",
    timelineYear: "0 BBY",
    crawl: "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.\n\nDuring the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.\n\nPursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
    summary: "In a galaxy under the iron grip of the Galactic Empire, Princess Leia captures the Death Star plans and hides them in R2-D2. The droids find their way to Luke Skywalker, a farm boy on Tatooine yearning for adventure. Guided by Obi-Wan Kenobi, Luke embarks on a hero's journey — learning the ways of the Force, rescuing Princess Leia, and ultimately destroying the Death Star in a desperate trench run, becoming a hero of the Rebel Alliance.",
    keyEvents: [
      "Princess Leia hides Death Star plans in R2-D2",
      "Luke Skywalker discovers Obi-Wan Kenobi",
      "Luke learns about the Force and his father's Jedi legacy",
      "Alderaan is destroyed by the Death Star",
      "Rescue of Princess Leia from the Death Star",
      "Obi-Wan Kenobi sacrifices himself in duel with Darth Vader",
      "Luke destroys the Death Star using the Force",
      "The Rebel Alliance achieves its first major victory"
    ],
    characters: ["Luke Skywalker", "Han Solo", "Princess Leia", "Darth Vader", "Obi-Wan Kenobi", "Chewbacca", "R2-D2", "C-3PO", "Grand Moff Tarkin"],
    planets: ["Tatooine", "Alderaan", "Yavin 4", "Death Star"],
    imageHint: "new-hope"
  },
  {
    id: 5,
    episode: 5,
    title: "The Empire Strikes Back",
    subtitle: "The adventure continues",
    year: 1980,
    director: "Irvin Kershner",
    era: "Original",
    timelineYear: "3 ABY",
    crawl: "It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy.\n\nEvading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth.\n\nThe evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space....",
    summary: "The Empire strikes back with devastating force. The Rebel base on Hoth is overrun, and the heroes are scattered. Luke travels to Dagobah to train with Master Yoda, learning deeper truths about the Force. Han and Leia flee through an asteroid field, eventually seeking refuge in Cloud City — only to fall into a trap set by Darth Vader. In one of cinema's greatest reveals, Vader tells Luke the truth about his parentage. The heroes are battered but not broken.",
    keyEvents: [
      "Battle of Hoth — Rebel base is evacuated",
      "Luke begins training with Master Yoda on Dagobah",
      "Han Solo and Leia flee through asteroid field",
      "Lando Calrissian betrays Han to Darth Vader",
      "Han Solo is frozen in carbonite",
      "Luke confronts Darth Vader — 'I am your father'",
      "Luke loses his hand and falls into despair",
      "The heroes regroup, vowing to rescue Han"
    ],
    characters: ["Luke Skywalker", "Han Solo", "Princess Leia", "Darth Vader", "Yoda", "Chewbacca", "Lando Calrissian", "Boba Fett", "R2-D2", "C-3PO"],
    planets: ["Hoth", "Dagobah", "Bespin (Cloud City)"],
    imageHint: "empire-strikes"
  },
  {
    id: 6,
    episode: 6,
    title: "Return of the Jedi",
    subtitle: "The saga concludes",
    year: 1983,
    director: "Richard Marquand",
    era: "Original",
    timelineYear: "4 ABY",
    crawl: "Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the clutches of the vile gangster Jabba the Hutt.\n\nLittle does Luke know that the GALACTIC EMPIRE has secretly begun construction on a new armored space station even more powerful than the first dreaded Death Star.\n\nWhen completed, this ultimate weapon will spell certain doom for the small band of rebels struggling to restore freedom to the galaxy....",
    summary: "The final chapter of the original trilogy. Luke rescues Han from Jabba the Hutt, then returns to complete his Jedi training. The Empire is building a second Death Star, and the Rebels launch a desperate two-pronged attack — a ground assault on Endor's shield generator and a space battle against the Death Star. Luke confronts Darth Vader and Emperor Palpatine, refusing to turn to the dark side. In a moment of redemption, Vader turns on his master to save his son, fulfilling the prophecy of the Chosen One.",
    keyEvents: [
      "Rescue of Han Solo from Jabba the Hutt",
      "Yoda dies and confirms Vader is Luke's father",
      "The Rebels learn of the second Death Star",
      "Speeder bike chase on Endor",
      "The Ewoks join the Rebel cause",
      "Luke surrenders to Darth Vader",
      "Emperor Palpatine tries to turn Luke to the dark side",
      "Darth Vader redeems himself, killing Palpatine",
      "Anakin Skywalker dies as a Jedi",
      "The second Death Star is destroyed",
      "The galaxy celebrates the fall of the Empire"
    ],
    characters: ["Luke Skywalker", "Han Solo", "Princess Leia", "Darth Vader / Anakin Skywalker", "Emperor Palpatine", "Yoda", "Lando Calrissian", "Chewbacca", "R2-D2", "C-3PO", "Boba Fett", "Jabba the Hutt"],
    planets: ["Tatooine", "Dagobah", "Endor", "Death Star II"],
    imageHint: "return-jedi"
  },
  {
    id: 7,
    episode: 7,
    title: "The Force Awakens",
    subtitle: "Every generation has a story",
    year: 2015,
    director: "J.J. Abrams",
    era: "Sequel",
    timelineYear: "34 ABY",
    crawl: "Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER has risen from the ashes of the Empire and will not rest until Skywalker, the last Jedi, has been destroyed.\n\nWith the support of the REPUBLIC, General Leia Organa leads a brave RESISTANCE. She is desperate to find her brother Luke and gain his help in restoring peace and justice to the galaxy.\n\nLeia has sent her most daring pilot on a secret mission to Jakku, where an old ally has discovered a clue to Luke's whereabouts....",
    summary: "Thirty years after the fall of the Empire, the First Order rises from its ashes, seeking to destroy the New Republic and the last Jedi. A scavenger named Rey on Jakku, a deserting stormtrooper named Finn, and the droid BB-8 become entangled in the search for Luke Skywalker. Han Solo and Chewbacca join the fight once more. The First Order's Starkiller Base destroys the New Republic capital, but the Resistance fights back. In a tragic confrontation, Kylo Ren — Han and Leia's fallen son — murders his father.",
    keyEvents: [
      "BB-8 obtains the map to Luke Skywalker",
      "Rey discovers her Force sensitivity",
      "Finn defects from the First Order",
      "Han Solo and Chewbacca return",
      "Starkiller Base destroys the New Republic",
      "The Battle of Starkiller Base",
      "Han Solo is killed by his son Kylo Ren",
      "Rey defeats Kylo Ren in a lightsaber duel",
      "R2-D2 awakens with the rest of the map",
      "Rey finds Luke Skywalker on Ahch-To"
    ],
    characters: ["Rey", "Finn", "Kylo Ren / Ben Solo", "Han Solo", "Leia Organa", "Poe Dameron", "BB-8", "Chewbacca", "Supreme Leader Snoke", "Luke Skywalker", "R2-D2", "Maz Kanata"],
    planets: ["Jakku", "Takodana", "Starkiller Base", "D'Qar", "Ahch-To"],
    imageHint: "force-awakens"
  },
  {
    id: 8,
    episode: 8,
    title: "The Last Jedi",
    subtitle: "Let the past die",
    year: 2017,
    director: "Rian Johnson",
    era: "Sequel",
    timelineYear: "34 ABY",
    crawl: "The FIRST ORDER reigns. Having decimated the peaceful Republic, Supreme Leader Snoke now deploys his merciless legions to seize military control of the galaxy.\n\nOnly General Leia Organa's band of RESISTANCE fighters stand against the rising tyranny, certain that Jedi Master Luke Skywalker will return and restore a spark of hope to the fight.\n\nBut the Resistance has been exposed. As the First Order speeds toward the rebel base, the brave heroes mount a desperate escape....",
    summary: "The Resistance is on the run, pursued by the First Order. Rey seeks out Luke Skywalker, but finds a broken man who has renounced the Jedi. Meanwhile, the Resistance fleet is slowly picked apart. Kylo Ren kills Supreme Leader Snoke and seizes power. Luke finally answers the call — projecting himself across the galaxy to confront the First Order and save the Resistance, sacrificing himself in the process. The Resistance survives, reduced to a handful, but hope is reignited across the galaxy.",
    keyEvents: [
      "Rey finds Luke Skywalker on Ahch-To",
      "Luke refuses to train Rey initially",
      "The Resistance fleet is trapped and slowly destroyed",
      "Kylo Ren kills Supreme Leader Snoke",
      "Kylo Ren and Rey fight the Praetorian Guards together",
      "Vice Admiral Holdo's hyperspace ramming maneuver",
      "Luke projects himself to face Kylo Ren on Crait",
      "Luke Skywalker becomes one with the Force",
      "The Resistance escapes on the Millennium Falcon",
      "Force-sensitive children across the galaxy are inspired"
    ],
    characters: ["Rey", "Kylo Ren / Ben Solo", "Luke Skywalker", "Leia Organa", "Finn", "Poe Dameron", "Supreme Leader Snoke", "Rose Tico", "Vice Admiral Holdo", "BB-8", "Chewbacca", "Yoda (Force spirit)"],
    planets: ["Ahch-To", "Crait", "Canto Bight", "Supremacy"],
    imageHint: "last-jedi"
  },
  {
    id: 9,
    episode: 9,
    title: "The Rise of Skywalker",
    subtitle: "The saga comes to an end",
    year: 2019,
    director: "J.J. Abrams",
    era: "Sequel",
    timelineYear: "35 ABY",
    crawl: "The dead speak! The galaxy has heard a mysterious broadcast, a threat of REVENGE in the sinister voice of the late EMPEROR PALPATINE.\n\nGENERAL LEIA ORGANA dispatches secret agents to gather intelligence, while REY, the last hope of the Jedi, trains for battle against the diabolical FIRST ORDER.\n\nMeanwhile, Supreme Leader KYLO REN rages in search of the phantom Emperor, determined to destroy any threat to his power....",
    summary: "Emperor Palpatine has returned from beyond death with a massive fleet of Star Destroyers — the Final Order. Rey discovers her heritage: she is a Palpatine, but chooses the path of the Jedi. Kylo Ren is redeemed by the memory of his father and returns as Ben Solo. In an epic final battle above Exegol, the citizens' fleet arrives. Rey confronts Palpatine, channeling the power of all the Jedi who came before her. The Emperor is destroyed once and for all. Ben Solo sacrifices himself to save Rey. The Skywalker saga ends with Rey taking the Skywalker name.",
    keyEvents: [
      "Palpatine's return is revealed",
      "Rey learns she is a Palpatine",
      "Kylo Ren is redeemed by Leia's sacrifice and Han's memory",
      "The Final Order fleet on Exegol is revealed",
      "Lando rallies the citizens' fleet",
      "Rey confronts Emperor Palpatine",
      "Rey hears the voices of past Jedi",
      "Palpatine is destroyed by Rey",
      "Ben Solo sacrifices himself to save Rey",
      "Rey takes the Skywalker name on Tatooine",
      "The Skywalker saga comes to an end"
    ],
    characters: ["Rey Skywalker", "Kylo Ren / Ben Solo", "Emperor Palpatine", "Leia Organa", "Finn", "Poe Dameron", "Chewbacca", "Lando Calrissian", "BB-8", "C-3PO", "Zorii Bliss", "Jannah"],
    planets: ["Exegol", "Pasaana", "Kijimi", "Kef Bir", "Mustafar", "Tatooine", "Ajan Kloss"],
    imageHint: "rise-skywalker"
  },
  {
    id: 10,
    episode: 0,
    title: "Rogue One",
    subtitle: "A Star Wars Story",
    year: 2016,
    director: "Gareth Edwards",
    era: "Spin-off",
    timelineYear: "0 BBY",
    crawl: "",
    summary: "The story of the unlikely heroes who stole the Death Star plans. Jyn Erso, daughter of the Death Star's reluctant creator Galen Erso, joins a ragtag group of rebels on a suicide mission to Scarif. Against impossible odds, they transmit the plans to the Rebel fleet — but at the ultimate cost. Every member of Rogue One perishes in the mission. The film ends with a breathtaking corridor sequence as Darth Vader mercilessly cuts down Rebel soldiers trying to escape with the plans — connecting directly to the opening of A New Hope.",
    keyEvents: [
      "Galen Erso sends a message about the Death Star weakness",
      "Jyn Erso is recruited by the Rebellion",
      "The team learns of the Death Star's fatal design flaw",
      "The Battle of Scarif begins",
      "Jyn and Cassian transmit the Death Star plans",
      "All members of Rogue One sacrifice their lives",
      "Darth Vader's corridor massacre",
      "Princess Leia receives the plans — hope is reborn"
    ],
    characters: ["Jyn Erso", "Cassian Andor", "K-2SO", "Chirrut Îmwe", "Baze Malbus", "Bodhi Rook", "Director Krennic", "Darth Vader", "Galen Erso", "Saw Gerrera"],
    planets: ["Wobani", "Jedha", "Eadu", "Scarif", "Mustafar"],
    imageHint: "rogue-one"
  },
  {
    id: 11,
    episode: 0,
    title: "Solo",
    subtitle: "A Star Wars Story",
    year: 2018,
    director: "Ron Howard",
    era: "Spin-off",
    timelineYear: "10 BBY",
    crawl: "",
    summary: "The origin story of the galaxy's most beloved scoundrel. Young Han Solo escapes the streets of Corellia and enters the dangerous underworld. He meets Chewbacca for the first time, wins the Millennium Falcon from Lando Calrissian in a game of sabacc, and makes the legendary Kessel Run in less than twelve parsecs. Along the way, he faces betrayal, loss, and the beginning of the rebellion that would change the galaxy.",
    keyEvents: [
      "Han escapes Corellia with Qi'ra",
      "Han meets Chewbacca in the Imperial army",
      "The coaxium heist on Vandor",
      "Han wins the Millennium Falcon from Lando",
      "The Kessel Run — twelve parsecs",
      "L3-37's sacrifice and integration into the Falcon",
      "Dryden Vos is killed",
      "Qi'ra reveals her allegiance to Maul",
      "Han wins the Falcon in a rematch",
      "Han and Chewbacca set off on their adventures"
    ],
    characters: ["Han Solo", "Chewbacca", "Lando Calrissian", "Qi'ra", "Tobias Beckett", "Dryden Vos", "L3-37", "Enfys Nest", "Darth Maul"],
    planets: ["Corellia", "Vandor", "Kessel", "Savareen", "Mandalore"],
    imageHint: "solo-story"
  }
];

export const eras = [
  {
    name: "The Prequel Trilogy",
    description: "The fall of the Republic and the rise of the Empire",
    color: "#E5C100",
    movies: [1, 2, 3]
  },
  {
    name: "The Original Trilogy",
    description: "The rebellion against the Empire and the redemption of Anakin Skywalker",
    color: "#FFE81F",
    movies: [4, 5, 6]
  },
  {
    name: "The Sequel Trilogy",
    description: "The next generation's fight against the First Order",
    color: "#FF6B35",
    movies: [7, 8, 9]
  },
  {
    name: "Star Wars Stories",
    description: "Tales from the galaxy's darkest and most daring corners",
    color: "#00D4AA",
    movies: [10, 11]
  }
];

export const sagaTimeline = [
  { year: "32 BBY", event: "The Phantom Menace", era: "Prequel" },
  { year: "22 BBY", event: "Attack of the Clones", era: "Prequel" },
  { year: "19 BBY", event: "Revenge of the Sith — Fall of the Republic", era: "Prequel" },
  { year: "10 BBY", event: "Solo: A Star Wars Story", era: "Spin-off" },
  { year: "0 BBY", event: "Rogue One / A New Hope", era: "Original" },
  { year: "3 ABY", event: "The Empire Strikes Back", era: "Original" },
  { year: "4 ABY", event: "Return of the Jedi — Fall of the Empire", era: "Original" },
  { year: "34 ABY", event: "The Force Awakens / The Last Jedi", era: "Sequel" },
  { year: "35 ABY", event: "The Rise of Skywalker — End of the Saga", era: "Sequel" }
];

export function getEpisodeRoman(episode: number): string {
  const romanMap: Record<number, string> = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
    7: 'VII', 8: 'VIII', 9: 'IX'
  };
  return romanMap[episode] || '';
}
