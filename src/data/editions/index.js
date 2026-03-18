import defaultData from './classic.json';
import clingyData from './clingy.json';
import spicyData from './spicy.json';
import deepData from './deep.json';
import healingData from './healing.json';
import funData from './fun.json';
import futureData from './future.json';
import conflictData from './conflict.json';
import appreciationData from './appreciation.json';
import attachmentData from './attachment.json';
import late_nightData from './late_night.json';
import toxicData from './toxic.json';
import soft_babyData from './soft_baby.json';
import truth_bombData from './truth_bomb.json';
import reassuranceData from './reassurance.json';
import compatibilityData from './compatibility.json';
import what_ifData from './what_if_scenario.json';
import first_loveData from './first_love.json';
import overthinkingData from './overthinking.json';
import intimacyData from './emotional_intimacy.json';
import self_reflectionData from './self_reflection.json';
import past_exesData from './past_and_exes.json';
import money_lifeData from './money_and_life.json';
import mood_swingsData from './mood_swings.json';
import after_darkData from './after_dark.json';
import effort_gestureData from './effort_and_gesture.json';

// Exported dynamically generated combinations
export const editions = {
  classic: { id: 'classic', name: 'Default Edition', data: defaultData },
  clingy: { id: 'clingy', name: 'Clingy Lovers Edition', data: clingyData },
  spicy: { id: 'spicy', name: 'Spicy Edition', data: spicyData },
  deep: { id: 'deep', name: 'Deep Talks Edition', data: deepData },
  healing: { id: 'healing', name: 'Healing Edition', data: healingData },
  fun: { id: 'fun', name: 'Fun & Silly Edition', data: funData },
  future: { id: 'future', name: 'Future & Goals Edition', data: futureData },
  conflict: { id: 'conflict', name: 'Conflict & Understanding Edition', data: conflictData },
  appreciation: { id: 'appreciation', name: 'Appreciation Edition', data: appreciationData },
  attachment: { id: 'attachment', name: 'Attachment Style Edition', data: attachmentData },
  late_night: { id: 'late_night', name: 'Late Night Talks Edition', data: late_nightData },
  toxic: { id: 'toxic', name: 'Toxic vs Healthy Edition', data: toxicData },
  soft_baby: { id: 'soft_baby', name: 'Soft & Baby Talk Edition', data: soft_babyData },
  truth_bomb: { id: 'truth_bomb', name: 'Truth Bomb Edition', data: truth_bombData },
  reassurance: { id: 'reassurance', name: 'Reassurance Edition', data: reassuranceData },
  compatibility: { id: 'compatibility', name: 'Compatibility Edition', data: compatibilityData },
  what_if: { id: 'what_if', name: 'What If Scenario Edition', data: what_ifData },
  first_love: { id: 'first_love', name: 'First Love Edition', data: first_loveData },
  overthinking: { id: 'overthinking', name: 'Overthinking Edition', data: overthinkingData },
  intimacy: { id: 'intimacy', name: 'Emotional Intimacy Edition', data: intimacyData },
  self_reflection: { id: 'self_reflection', name: 'Self Reflection Edition', data: self_reflectionData },
  past_exes: { id: 'past_exes', name: 'Past & Exes Edition', data: past_exesData },
  money_life: { id: 'money_life', name: 'Money & Life Edition', data: money_lifeData },
  mood_swings: { id: 'mood_swings', name: 'Mood Swings Edition', data: mood_swingsData },
  after_dark: { id: 'after_dark', name: 'After Dark Edition', data: after_darkData },
  effort_gesture: { id: 'effort_gesture', name: 'Effort & Gesture Edition', data: effort_gestureData },
};
