const attributesRange = {
  GK: {
    finishing: 0, crossing: 0, dribbling: 0, heading: 1, tackling: 1, marking: 0, passing: 2, free_kick: 0,
    acceleration: 3, agility: 3, strength: 4, jumping: 5,
    vision: 2, decision: 5, positioning: 5, anticipation: 4, aggression: 2,
    reflexes: 8, handling: 8, diving: 8
  },
  CB: {
    finishing: 0, crossing: 1, dribbling: 1, heading: 5, tackling: 7, marking: 7, passing: 3, free_kick: 0,
    acceleration: 3, agility: 3, strength: 7, jumping: 7,
    vision: 2, decision: 4, positioning: 6, anticipation: 5, aggression: 5,
    reflexes: 2, handling: 0, diving: 1
  },
  RB: {
    finishing: 2, crossing: 7, dribbling: 6, heading: 4, tackling: 5, marking: 5, passing: 6, free_kick: 1,
    acceleration: 8, agility: 8, strength: 5, jumping: 5,
    vision: 5, decision: 4, positioning: 5, anticipation: 5, aggression: 4,
    reflexes: 1, handling: 0, diving: 1
  },
  LB: {
    finishing: 2, crossing: 7, dribbling: 6, heading: 4, tackling: 5, marking: 5, passing: 6, free_kick: 1,
    acceleration: 8, agility: 8, strength: 5, jumping: 5,
    vision: 5, decision: 4, positioning: 5, anticipation: 5, aggression: 4,
    reflexes: 1, handling: 0, diving: 1
  },
  CDM: {
    finishing: 2, crossing: 2, dribbling: 3, heading: 4, tackling: 7, marking: 6, passing: 7, free_kick: 2,
    acceleration: 5, agility: 4, strength: 6, jumping: 5,
    vision: 6, decision: 6, positioning: 6, anticipation: 6, aggression: 6,
    reflexes: 1, handling: 0, diving: 1
  },
  CM: {
    finishing: 4, crossing: 4, dribbling: 6, heading: 3, tackling: 4, marking: 4, passing: 8, free_kick: 3,
    acceleration: 5, agility: 6, strength: 4, jumping: 4,
    vision: 7, decision: 7, positioning: 5, anticipation: 5, aggression: 3,
    reflexes: 1, handling: 0, diving: 1
  },
  CAM: {
    finishing: 6, crossing: 4, dribbling: 8, heading: 2, tackling: 2, marking: 2, passing: 8, free_kick: 5,
    acceleration: 6, agility: 7, strength: 4, jumping: 3,
    vision: 8, decision: 6, positioning: 5, anticipation: 5, aggression: 3,
    reflexes: 1, handling: 0, diving: 1
  },
  LW: {
    finishing: 7, crossing: 8, dribbling: 9, heading: 2, tackling: 2, marking: 2, passing: 7, free_kick: 4,
    acceleration: 9, agility: 9, strength: 4, jumping: 4,
    vision: 6, decision: 7, positioning: 5, anticipation: 5, aggression: 3,
    reflexes: 1, handling: 0, diving: 1
  },
  RW: {
    finishing: 7, crossing: 8, dribbling: 9, heading: 2, tackling: 2, marking: 2, passing: 7, free_kick: 4,
    acceleration: 9, agility: 9, strength: 4, jumping: 4,
    vision: 6, decision: 7, positioning: 5, anticipation: 5, aggression: 3,
    reflexes: 1, handling: 0, diving: 1
  },
  ST: {
    finishing: 9, crossing: 1, dribbling: 6, heading: 6, tackling: 2, marking: 2, passing: 5, free_kick: 1,
    acceleration: 8, agility: 7, strength: 7, jumping: 6,
    vision: 5, decision: 6, positioning: 8, anticipation: 6, aggression: 5,
    reflexes: 1, handling: 0, diving: 1
  }
};

export default attributesRange;