export type Club = {
  id: number,
  name: string,
  foundend_year: number,
  reputation: number,
  balance: number,
  budget: number,
  salaries: number,
  is_nation: number,
  image_logo: string,
  nation_id: number,
  stadium_id: number,
}

export type ClubFinance = {
  club_id: number,
  balance: number,
  budget: number,
  salaries: number
}

export type ClubTransaction = {
  type: string,
  date: string,
  value: number,
}