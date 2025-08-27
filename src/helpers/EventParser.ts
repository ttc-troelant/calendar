import { ActivityCategory } from '@/models/Activity'

export function GetCategoryFromDescription(description: string): ActivityCategory {
  if (description.includes('Troelant A')) return ActivityCategory.APLOEG
  if (description.includes('Troelant B')) return ActivityCategory.BPLOEG
  if (description.includes('Troelant C')) return ActivityCategory.CPLOEG
  if (description.toLowerCase().includes('onbeschikbaar')) return ActivityCategory.ONBESCHIKBAAR
  return ActivityCategory.ALGEMEEN
}
