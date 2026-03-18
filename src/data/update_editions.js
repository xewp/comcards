import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const editionsDefinition = [
  { name: "Default Edition", id: "default" },
  { name: "Clingy Lovers Edition", id: "clingy" },
  { name: "Spicy Edition", id: "spicy" },
  { name: "Deep Talks Edition", id: "deep" },
  { name: "Healing Edition", id: "healing" },
  { name: "Fun & Silly Edition", id: "fun" },
  { name: "Future & Goals Edition", id: "future" },
  { name: "Conflict & Understanding Edition", id: "conflict" },
  { name: "Appreciation Edition", id: "appreciation" },
  { name: "Attachment Style Edition", id: "attachment" },
  { name: "Late Night Talks Edition", id: "late_night" },
  { name: "Toxic vs Healthy Edition", id: "toxic_healthy" },
  { name: "Soft & Baby Talk Edition", id: "soft_baby" },
  { name: "Truth Bomb Edition", id: "truth_bomb" },
  { name: "Reassurance Edition", id: "reassurance" },
  { name: "Compatibility Edition", id: "compatibility" },
  { name: "What If Scenario Edition", id: "what_if" },
  { name: "First Love Edition", id: "first_love" },
  { name: "Overthinking Edition", id: "overthinking" },
  { name: "Emotional Intimacy Edition", id: "intimacy" },
  { name: "Self Reflection Edition", id: "self_reflection" },
  { name: "Past & Exes Edition", id: "past_exes" },
  { name: "Money & Life Edition", id: "money_life" },
  { name: "Mood Swings Edition", id: "mood_swings" },
  { name: "After Dark Edition", id: "after_dark" },
  { name: "Effort & Gesture Edition", id: "effort_gesture" },
];

const goodQuestions = [
  { qT: "Ano yung namimiss mo sakin pag hindi tayo magkasama?", qE: "What do you miss about me when we're apart?", qtT: "Sayo lang ako sumasaya ng ganito.", qtE: "You are the only one who makes me this happy." },
  { qT: "Ano yung paborito mong memory nating dalawa?", qE: "What is your favorite memory of us?", qtT: "Ikaw yung pinakamagandang nangyari sakin.", qtE: "You are the best thing that ever happened to me." },
  { qT: "Anong nakakapagpa-smile sayo na ginagawa ko?", qE: "What do I do that makes you smile?", qtT: "Ang swerte ko kasi ikaw yung kasama ko.", qtE: "I'm so lucky to have you by my side." },
  { qT: "Ano yung first impression mo sakin?", qE: "What was your first impression of me?", qtT: "Kahit kailan, ikaw lang ang pipiliin ko.", qtE: "I will always choose you, no matter what." },
  { qT: "Saan mo gusto tayo mag-travel next?", qE: "Where do you want us to travel next?", qtT: "Gusto kong libutin ang mundo kasama ka.", qtE: "I want to travel the world with you." },
  { qT: "Ano yung pinaka-cute na habit ko para sayo?", qE: "What is my cutest habit for you?", qtT: "Sa bawat araw, mas lalo kitang minamahal.", qtE: "With every passing day, I love you even more." },
  { qT: "Anong paborito mong date natin?", qE: "What is your favorite date of ours?", qtT: "Walang boring na araw pag kasama kita.", qtE: "There's never a boring day when I'm with you." },
  { qT: "Kailan mo na-realize na in love ka sakin?", qE: "When did you realize you were in love with me?", qtT: "Nung dumating ka, gumaan ang buhay ko.", qtE: "When you arrived, my life became brighter." },
  { qT: "Ano yung gusto mong gawin natin na hindi pa natin nagagawa?", qE: "What do you want to do that we haven't done yet?", qtT: "Marami pa tayong gagawing memories.", qtE: "We still have so many memories to make together." },
  { qT: "Anong kanta yung nagpapaalala sayo sakin?", qE: "What song reminds you of me?", qtT: "Ikaw ang paborito kong musika.", qtE: "You are my favorite melody." },
  { qT: "Ano yung pinaka-gusto mong ugali ko?", qE: "What is your favorite trait of mine?", qtT: "Lahat sa'yo, mahal ko.", qtE: "I love absolutely everything about you." },
  { qT: "Anong pagkain ang nagpapaalala sayo sakin?", qE: "What food reminds you of me?", qtT: "Ikaw ang sweet ko.", qtE: "You are my sweetest treat." },
  { qT: "Kung may superpower tayo, ano yung gusto mong piliin natin?", qE: "If we had a superpower, what would you want us to choose?", qtT: "Ang makasama ka ay ang pinakamalakas kong kapangyarihan.", qtE: "Being with you is my greatest power." },
  { qT: "Paano mo ako ide-describe sa ibang tao?", qE: "How would you describe me to other people?", qtT: "Ipinagmamalaki ko na akin ka.", qtE: "I am so proud to call you mine." },
  { qT: "Ano yung pinaka-nakakatawang memory natin?", qE: "What is our funniest memory?", qtT: "Ang tawa mo ang paborito kong tunog.", qtE: "Your laugh is my absolute favorite sound." },
  { qT: "Kailan mo ako pinaka-na-miss?", qE: "When did you miss me the most?", qtT: "Kahit magkasama tayo, namimiss pa rin kita.", qtE: "Even when we're together, I still miss you." },
  { qT: "Ano yung gusto mong gift na matanggap galing sakin?", qE: "What gift do you want to receive from me?", qtT: "Ang oras mo ang pinakamagandang regalo.", qtE: "Your time is the most beautiful gift." },
  { qT: "Ano yung paborito mong nickname na tawag ko sayo?", qE: "What is your favorite nickname that I call you?", qtT: "Ang sarap pakinggan pag tinatawag mo ako.", qtE: "It feels so good when you call my name." },
  { qT: "Saan mo tayo nakikita after 5 years?", qE: "Where do you see us in 5 years?", qtT: "Basta kasama kita, okay na ako sa future.", qtE: "As long as I'm with you, my future is set." },
  { qT: "Anong bagay ang palagi mong ipagpapasalamat natin?", qE: "What is one thing you will always be thankful for regarding us?", qtT: "Araw-araw akong nagpapasalamat dahil dumating ka.", qtE: "I thank God every day that you came into my life." },
  { qT: "Anong paborito mong outfit na sinusuot ko?", qE: "What is your favorite outfit that I wear?", qtT: "Ang perfect mo palagi sa paningin ko.", qtE: "You always look perfect in my eyes." },
  { qT: "Saan mo gustong tumambay kasama ako pag umuulan?", qE: "Where do you want to hang out with me when it rains?", qtT: "Ang init ng yakap mo ang hanap ko.", qtE: "The warmth of your embrace is all I need." },
  { qT: "Ano yung pinaka-sweet na ginawa ko para sayo?", qE: "What is the sweetest thing I’ve done for you?", qtT: "Yung mga simpleng bagay mo, sobra akong napapasaya.", qtE: "Your simple gestures make me incredibly happy." },
  { qT: "Ano yung una mong napansin sakin?", qE: "What was the first thing you noticed about me?", qtT: "Na-attract ako sayo nung una pa lang.", qtE: "I was attracted to you from the very beginning." },
  { qT: "Anong movie ang gusto mong i-marathon natin?", qE: "What movie do you want us to marathon?", qtT: "Ikaw ang paborito kong kasama sa lahat ng bagay.", qtE: "You are my favorite companion for everything." },
  { qT: "Anong comfort food mo pag malungkot ka tapos kasama kita?", qE: "What is your comfort food when you're sad and I'm with you?", qtT: "Ang presensya mo ang nagpapakalma sakin.", qtE: "Your presence is what calms me down." },
  { qT: "Kung magkakaroon tayo ng isang buong araw para mag-relax, paano natin uubusin ang oras?", qE: "If we had a whole day to just relax, how would we spend it?", qtT: "Ang magpahinga sa tabi mo ang paborito kong pahinga.", qtE: "Resting beside you is my favorite kind of rest." },
  { qT: "Anong paborito mong picture natin?", qE: "What is your favorite picture of us?", qtT: "Sa bawat litrato, ikaw lang ang nakikita ko.", qtE: "In every photo, you are all I see." },
  { qT: "Ano yung pinaka-random na naiisip mo tungkol sakin bago ka matulog?", qE: "What is the most random thing you think about me before going to sleep?", qtT: "Ikaw ang huli kong iniisip bago matulog at una sa paggising.", qtE: "You are my last thought at night and first in the morning." },
  { qT: "Kailan mo naramdaman na sobrang proud ka sakin?", qE: "When did you feel super proud of me?", qtT: "Palagi akong nakasuporta sa lahat ng pangarap mo.", qtE: "I will always support all your dreams." },
  { qT: "Anong maliit na bagay ang nagpapangiti sayo pag naiisip mo ako?", qE: "What small thing makes you smile when you think of me?", qtT: "Ang maalala ka ay sapat na para sumaya ako.", qtE: "Just thinking of you is enough to make me happy." },
  { qT: "Ano yung paborito mong topic natin pag nagkukuwentuhan tayo?", qE: "What is your favorite topic when we’re just chatting?", qtT: "Kahit anong pag-usapan natin, di ako magsasawa.", qtE: "Whatever we talk about, I'll never get tired of listening." },
  { qT: "Anong activity ang gusto mong i-try natin together?", qE: "What activity do you want us to try together?", qtT: "Gusto kong gumawa ng maraming bagong memories kasama ka.", qtE: "I want to make a lot of new memories with you." },
  { qT: "Ano yung pinaka-nakakakilig na sinabi ko sayo?", qE: "What is the most heart-fluttering thing I’ve said to you?", qtT: "Ang boses mo ang nagpapabilis ng tibok ng puso ko.", qtE: "Your voice makes my heart beat faster." },
  { qT: "Saan ang dream vacation mo na kasama ako?", qE: "Where is your dream vacation with me?", qtT: "Ikaw ang tahanan at pahinga ko.", qtE: "You are my home and my safe place." },
  { qT: "Anong bagay ang natutunan mo sakin mula nung naging tayo?", qE: "What have you learned from me since we got together?", qtT: "Binago mo ang buhay ko para sa mas maganda.", qtE: "You changed my life for the better." },
  { qT: "Ano yung gusto mong palagi kong pinapaalala sayo?", qE: "What do you want me to always remind you of?", qtT: "Mahal kita, araw-araw at oras-oras.", qtE: "I love you, every single day and every single hour." },
  { qT: "Kailan mo naramdamang sobrang ganda/gwapo ko sa paningin mo?", qE: "When did you feel I looked most beautiful/handsome to you?", qtT: "Sa paningin ko, ikaw na ang pinakaperpekto.", qtE: "In my eyes, you are absolute perfection." },
  { qT: "Ano yung paborito mong amoy sakin?", qE: "What is your favorite scent of mine?", qtT: "Ang bango mo ay nagpapangiti sakin.", qtE: "Your scent always brings a smile to my face." },
  { qT: "Ano yung pinaka-favorite mong gift na binigay ko sayo?", qE: "What is your favorite gift that I gave you?", qtT: "Ikaw ang pinaka-precious na regalo na natanggap ko.", qtE: "You are the most precious gift I have ever received." },
  { qT: "Anong hobby ko ang pinaka-cute para sayo?", qE: "Which of my hobbies is the cutest to you?", qtT: "Suportado ko lahat ng bagay na nagpapasaya sayo.", qtE: "I support everything that brings you joy." },
  { qT: "Ano yung pinaka-gusto mong part ng mukha ko?", qE: "What is your favorite part of my face?", qtT: "Hindi ako magsasawang titigan ka.", qtE: "I will never get tired of staring at you." },
  { qT: "Ano yung palagi mong hinihiling para satin?", qE: "What do you always wish for us?", qtT: "Gusto kong tumanda na ikaw ang kasama.", qtE: "I want to grow old with you by my side." },
  { qT: "Ano yung unang pumasok sa isip mo nung umamin ako sayo?", qE: "What first came to mind when I confessed to you?", qtT: "Simula nung araw na yun, naging mas masaya ako.", qtE: "Since that day, I became so much happier." },
  { qT: "Anong joke ko ang palagi mong naaalala?", qE: "What joke of mine do you always remember?", qtT: "Kahit korni, napapasaya mo ako.", qtE: "Even when it's corny, you make me happy." },
  { qT: "Ano yung paboritong advice na binigay ko sayo?", qE: "What is your favorite advice I've given you?", qtT: "Ikaw ang paborito kong kasangga sa buhay.", qtE: "You are my favorite partner in life." },
  { qT: "Kung magiging kanta yung love story natin, ano yung title?", qE: "If our love story were a song, what would the title be?", qtT: "Tayo ang paborito kong musika.", qtE: "We are my favorite melody." },
  { qT: "Ano yung palaging nagpapangiti sayo nung nililigawan pa lang kita?", qE: "What always made you smile when I was still courting you?", qtT: "Hindi nagbago ang kilig ko sayo.", qtE: "My butterflies for you never changed." },
  { qT: "Anong klaseng hug ang pinaka-favorite mo galing sakin?", qE: "What kind of hug is your favorite from me?", qtT: "Ang yakap mo ang pinakaligtas na lugar para sakin.", qtE: "Your hug is the safest place for me." },
  { qT: "Kailan mo na-feel na meant to be tayo?", qE: "When did you feel that we were meant to be?", qtT: "Naniniwala akong pinagtagpo talaga tayo.", qtE: "I believe we were really meant to meet." },
  { qT: "Ano yung pinaka-gusto mong compliments galing sakin?", qE: "What is your favorite compliments from me?", qtT: "Gusto kitang laging napapasaya.", qtE: "I always want to make you smile." },
  { qT: "Anong part ng araw yung pinaka-gusto mo kasama ako?", qE: "What part of the day do you enjoy most with me?", qtT: "Kahit anong oras, basta kasama kita.", qtE: "Any time is perfect as long as I'm with you." },
  { qT: "Ano yung first date natin na hindi mo makakalimutan?", qE: "What is our first date that you will never forget?", qtT: "Lahat ng una natin ay espesyal.", qtE: "All our firsts are special." },
  { qT: "Kung pwede mong ulitin yung isang araw nation, kailan yun?", qE: "If you could repeat one day of ours, when would it be?", qtT: "Gusto kong ulitin kung paano tayo nagsimula.", qtE: "I want to replay how we started." },
  { qT: "Anong paborito mong tawag ko sa mga magulang/pamilya mo?", qE: "What is your favorite way I call your parents/family?", qtT: "Masaya ako na parte ako ng mundo mo.", qtE: "I'm happy to be a part of your world." },
  { qT: "Ano yung pinaka-nakakatuwang bagay na natutunan mo about me?", qE: "What is the funniest thing you learned about me?", qtT: "Gusto kong malaman lahat tungkol sayo.", qtE: "I want to know everything about you." },
  { qT: "Ano yung favorite late-night thought mo sakin?", qE: "What is your favorite late-night thought about me?", qtT: "Sana panaginip na lang lagi na kasama kita.", qtE: "I wish I were always dreaming of being with you." },
  { qT: "Anong bagay ang binago ko sa perspective mo sa pag-ibig?", qE: "What did I change about your perspective on love?", qtT: "Pinaramdam mo sakin ang totoong pag-ibig.", qtE: "You made me feel what true love is." },
  { qT: "Saan mo gustong i-celebrate natin ang next anniversary natin?", qE: "Where do you want us to celebrate our next anniversary?", qtT: "Kahit saan, basta hawak ko ang kamay mo.", qtE: "Anywhere, as long as I'm holding your hand." },
  { qT: "Ano yung pinaka-thankful ka sa relasyon natin?", qE: "What are you most thankful for in our relationship?", qtT: "Ikaw ang sagot sa lahat ng dasal ko.", qtE: "You are the answer to all my prayers." },
];

const generatedClassicData = goodQuestions.map((q, i) => ({
  id: i + 1,
  question_tagalog: q.qT,
  question_english: q.qE,
  quote_tagalog: q.qtT,
  quote_english: q.qtE,
}));

const editionsDir = path.join(__dirname, 'editions');

if (!fs.existsSync(editionsDir)) {
  fs.mkdirSync(editionsDir, { recursive: true });
}

// Write the classic questions
fs.writeFileSync(path.join(editionsDir, 'classic.json'), JSON.stringify(generatedClassicData, null, 2));

const placeholderData = (editionName) => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question_tagalog: `${editionName} Tagalog Question ${i + 1}`,
    question_english: `${editionName} English Question ${i + 1}`,
    quote_tagalog: `Tagalog Quote ${i + 1}`,
    quote_english: `English Quote ${i + 1}`,
  }));
};

let indexJsVars = [];
let indexJsExports = [];

editionsDefinition.forEach((ed) => {
  const actualId = ed.id === 'default' ? 'classic' : ed.id;
  const actualFilename = actualId + '.json';
  const actualFilePath = path.join(editionsDir, actualFilename);

  let varName = ed.id.replace(/[^a-zA-Z0-9]/g, '_') + 'Data';

  if (!fs.existsSync(actualFilePath)) {
    fs.writeFileSync(actualFilePath, JSON.stringify(placeholderData(ed.name), null, 2));
  } else {
    try {
      if (actualId !== 'classic') {
        const fileContent = fs.readFileSync(actualFilePath, 'utf-8');
        const existingData = JSON.parse(fileContent);
        if (!existingData || existingData.length === 0) {
          fs.writeFileSync(actualFilePath, JSON.stringify(placeholderData(ed.name), null, 2));
        }
      }
    } catch (e) {
      console.warn('Could not validate ' + actualFilePath);
    }
  }

  // Import lines for index.js
  indexJsVars.push(`import ${varName} from './${actualFilename}';`);
  indexJsExports.push(`  ${actualId}: { id: '${actualId}', name: '${ed.name.replace("'", "\\'")}', data: ${varName} },`);
});

const indexJsContent = `${indexJsVars.join('\\n')}

// Exported dynamically generated combinations
export const editions = {
${indexJsExports.join('\\n')}
};
`;

fs.writeFileSync(path.join(editionsDir, 'index.js'), indexJsContent);
console.log('Editions successfully generated and index.js updated.');
