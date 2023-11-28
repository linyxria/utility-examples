import { useMemo } from 'react'

import { useChinaAreas } from '~/hooks/china'

export const useChartOption = (adcode: number) => {
  const { data: chinaAreas } = useChinaAreas()
  const isChina = adcode === 100000

  return useMemo(() => {
    const mapName = adcode.toString()
    const subAreas = chinaAreas.filter((area) => area.parent === adcode)

    const scatterData = subAreas.map((area) => [
      area.lng,
      area.lat,
      Math.random() * 100 + 1,
    ])

    return {
      geo: {
        map: mapName,
        roam: true,
        layoutCenter: ['50%', isChina ? '70%' : '50%'],
        layoutSize: '100%',
        zoom: 1.25,
        scaleLimit: {
          min: 0.75,
        },
        label: {
          show: true,
        },
      },
      series: [
        {
          name: '人口密度',
          type: 'map',
          geoIndex: 0,
          data: subAreas.map((area) => ({
            ...area,
            value: Math.random() * (50000 - 800 + 1) + 800,
          })),
        },
        {
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          data: scatterData,
          symbolSize: 16,
          encode: {
            value: 2,
          },
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          data: scatterData.sort((a, b) => b[2] - a[2]).slice(0, 6),
          symbolSize: 32,
          encode: {
            value: 2,
          },
        },
      ],
      visualMap: {
        min: 800,
        max: 50000,
        text: ['高', '低'],
        calculable: true,
        inRange: {
          color: ['#7dd3fc', '#6ee7b7', '#fde047', '#fdba74', '#fca5a5'],
        },
      },
      tooltip: {
        show: true,
        trigger: 'item',
      },
    }
  }, [adcode, chinaAreas, isChina])
}
