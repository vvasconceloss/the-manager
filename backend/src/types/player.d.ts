export type Player = {
  first_name: string,
  last_name: string,
  birth_date: string,
  position: string,
  market_value: number,
  current_ability: number,
  potential_ability: number,
  overall: number,
  finishing: number,
  crossing: number,
  dribbling: number
  heading: number,
  tackling: number,
  marking: number,
  passing: number,
  free_kick: number,
  acceleration: number,
  agility: number,
  strength: number,
  jumping: number,
  vision: number,
  decision: number,
  positioning: number,
  antecipation: number,
  aggression: number,
  reflexes: number,
  handling: number,
  diving: number,
  nation_id: number
}

export type PlayerContract = {
  id: number,
  salary: number,
  start_date: string,
  end_date: string,
  player_id: number,
  club_id: number
}