import { useJson } from './common'

export type ChinaAreaLevel = 'country' | 'province' | 'city' | 'district'

export interface ChinaArea {
  name: string
  adcode: number
  level: ChinaAreaLevel
  lng: number
  lat: number
  parent: number | null
}

const initialChinaAreas: ChinaArea[] = []

export const useChinaAreas = () => {
  const { data = initialChinaAreas, ...props } = useJson<ChinaArea[]>(
    'china-areas.json',
    {
      staleTime: Infinity,
    }
  )

  return {
    data,
    ...props,
  }
}

export const useChinaAreaMap = <T extends keyof ChinaArea>(keyField: T) => {
  const { data, ...props } = useChinaAreas()

  return {
    data: new Map<ChinaArea[T], ChinaArea>(
      data.map((item) => [item[keyField], item])
    ),
    ...props,
  }
}