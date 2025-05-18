export interface Activity {
  title: string,
  description?: string,
  from: Date,
  till: Date,
  categories: ActivityCategories[],
  location?: string
}

export enum ActivityCategories {
  APLOEG = "Troelant A",
  BPLOEG = "Troelant B",
  CPLOEG = "Troelant C",
  ALGEMEEN = "Algemeen"
}