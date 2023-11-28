import { registerMap } from 'echarts'
import EChartsReact from 'echarts-for-react'
import { useEffect, useState } from 'react'

import { ChinaArea } from '~/hooks/china'
import { useJson } from '~/hooks/common'

import { useChartOption } from './hooks'

interface Props {
  adcode: number
  onSubAreaClick: (area: ChinaArea) => void
}

const ChoroplethMap = ({ adcode, onSubAreaClick }: Props) => {
  const { data: geoData, isFetching } = useJson<any>(`/china/${adcode}.json`, {
    staleTime: Infinity,
  })

  const mapName = adcode.toString()
  const [geoMap, setGeoMap] = useState<Map<string, any>>(new Map())

  useEffect(() => {
    if (geoData) {
      registerMap(mapName, geoData)
      setGeoMap((prev) => new Map(prev.set(mapName, geoData)))
    }
  }, [geoData, mapName])

  const option = useChartOption(adcode)

  if (!geoMap.has(mapName)) {
    return null
  }

  return (
    <EChartsReact
      style={{ width: '100%', height: '100%' }}
      option={option}
      showLoading={isFetching}
      onEvents={{
        click: (params: any) => {
          if (params.seriesType === 'map' && params.data) {
            onSubAreaClick(params.data)
          }
        },
      }}
    />
  )
}

export default ChoroplethMap
