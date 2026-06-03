interface Quote {
  quote: string;
  translation: string;
  author: string;
}

export const frenchQuotes: Quote[] = [
  { quote: "Impossible n'est pas français.", translation: "Impossible is not French.", author: "Napoléon Bonaparte" },
  { quote: "On ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux.", translation: "One sees clearly only with the heart. What is essential is invisible to the eye.", author: "Antoine de Saint-Exupéry" },
  { quote: "Il n'y a pas de vent favorable pour celui qui ne sait pas où il va.", translation: "There is no favorable wind for those who don't know where they're going.", author: "Sénèque" },
  { quote: "La patience est amère, mais son fruit est doux.", translation: "Patience is bitter, but its fruit is sweet.", author: "Jean-Jacques Rousseau" },
  { quote: "Je pense, donc je suis.", translation: "I think, therefore I am.", author: "René Descartes" },
  { quote: "Qui veut voyager loin ménage sa monture.", translation: "Those who want to travel far take care of their mount.", author: "Proverbe français" },
  { quote: "Les petits ruisseaux font les grandes rivières.", translation: "Small streams make great rivers.", author: "Proverbe français" },
  { quote: "Mieux vaut prévenir que guérir.", translation: "Better to prevent than to cure.", author: "Proverbe français" },
  { quote: "L'habit ne fait pas le moine.", translation: "The habit doesn't make the monk.", author: "Proverbe français" },
  { quote: "Vouloir c'est pouvoir.", translation: "To want is to be able.", author: "Proverbe français" },
  { quote: "La connaissance s'acquiert par l'expérience, tout le reste n'est que de l'information.", translation: "Knowledge is acquired through experience; everything else is just information.", author: "Albert Einstein" },
  { quote: "Il faut cultiver notre jardin.", translation: "We must cultivate our garden.", author: "Voltaire" },
  { quote: "Rien ne sert de courir, il faut partir à point.", translation: "Haste makes waste; one must set off in good time.", author: "Jean de La Fontaine" },
  { quote: "Le monde est un livre, et ceux qui ne voyagent pas n'en lisent qu'une page.", translation: "The world is a book, and those who do not travel read only one page.", author: "Saint Augustin" },
  { quote: "La parole est d'argent, mais le silence est d'or.", translation: "Speech is silver, but silence is golden.", author: "Proverbe français" },
  { quote: "Rome ne s'est pas faite en un jour.", translation: "Rome wasn't built in a day.", author: "Proverbe français" },
  { quote: "Mieux vaut tard que jamais.", translation: "Better late than never.", author: "Proverbe français" },
  { quote: "À cœur vaillant rien d'impossible.", translation: "For a brave heart, nothing is impossible.", author: "Proverbe français" },
  { quote: "Aide-toi, le ciel t'aidera.", translation: "Help yourself and heaven will help you.", author: "Jean de La Fontaine" },
  { quote: "Ce qui ne tue pas rend plus fort.", translation: "What doesn't kill you makes you stronger.", author: "Friedrich Nietzsche" },
  { quote: "Il n'est jamais trop tard pour apprendre.", translation: "It is never too late to learn.", author: "Proverbe français" },
  { quote: "Dis-moi qui tu hantes, je te dirai qui tu es.", translation: "Tell me who you spend time with and I'll tell you who you are.", author: "Proverbe français" },
  { quote: "La liberté des uns s'arrête là où commence celle des autres.", translation: "The freedom of some ends where that of others begins.", author: "Proverbe français" },
  { quote: "Le temps perdu ne se rattrape jamais.", translation: "Lost time is never found again.", author: "Benjamin Franklin" },
  { quote: "La vie est trop courte pour boire du mauvais vin.", translation: "Life is too short to drink bad wine.", author: "Johann Wolfgang von Goethe" },
  { quote: "Un ami, c'est quelqu'un qui vous connaît bien et qui vous aime quand même.", translation: "A friend is someone who knows you well and loves you anyway.", author: "Elbert Hubbard" },
  { quote: "Nul n'est prophète en son pays.", translation: "No man is a prophet in his own country.", author: "Proverbe français" },
  { quote: "La bonne cuisine est la base du véritable bonheur.", translation: "Good cooking is the foundation of true happiness.", author: "Auguste Escoffier" },
  { quote: "Tout ce qui brille n'est pas or.", translation: "All that glitters is not gold.", author: "Proverbe français" },
  { quote: "Chaque jour est une nouvelle vie.", translation: "Every day is a new life.", author: "Proverbe français" },
  { quote: "Il vaut mieux vivre un jour comme un lion que cent ans comme un mouton.", translation: "It is better to live one day as a lion than a hundred years as a sheep.", author: "Proverbe français" },
];

export function getDailyQuote(): Quote {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000);
  return frenchQuotes[dayOfYear % frenchQuotes.length];
}
