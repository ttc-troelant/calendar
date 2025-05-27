export interface Activity {
  title: string
  description?: string
  from: Date
  till: Date
  category: ActivityCategory
  location?: string
}

export enum ActivityCategory {
  APLOEG = 'Troelant A',
  BPLOEG = 'Troelant B',
  CPLOEG = 'Troelant C',
  ALGEMEEN = 'Algemeen',
  ONBESCHIKBAAR = 'Zaal onbeschikbaar',
}
