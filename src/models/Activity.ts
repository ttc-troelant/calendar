export interface Activity {
  id: number
  title: string
  description?: string
  from: string
  till: string
  category: ActivityCategory
  location?: string
}

export enum ActivityCategory {
  ONBESCHIKBAAR = -1,
  ALGEMEEN = 0,
  BEKER = 1,
  MASTER = 2,
  APLOEG = 10,
  BPLOEG = 11,
  CPLOEG = 12,
  DPLOEG = 13,
}
