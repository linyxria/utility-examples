import rewind from '@turf/rewind'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { useMeasure } from 'react-use'

const D3Map = () => {
  const [$container, { width, height }] = useMeasure<HTMLDivElement>()
  const $svg = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!width || !height) {
      return
    }

    d3.json<any>('/json/china/100000.json').then((data) => {
      const geoJson = {
        ...data,
        features: data.features.map((feature: any) =>
          rewind(feature, { reverse: true })
        ),
      }
      // const topology = topojsonServer.topology({ map: data })
      // const feature = topojsonClient.feature(topology, topology.objects.map)
      // const features =
      //   feature.type === 'FeatureCollection' ? feature.features : [feature]

      const svg = d3
        .select('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])

      const g = svg.append('g')
      const projection = d3.geoMercator().fitSize([width, height], geoJson)
      // .scale((width * 1.7) / Math.PI)
      // .center([105, 32])
      // .translate([width / 2, height / 2])
      const path = d3.geoPath(projection).projection(projection)

      const draw = g.selectAll('path').data(geoJson.features)

      draw
        .join('path')
        .attr('d', (d: any) => path(d))
        .attr('stroke-width', 0.5)
        .attr('stroke', '#000')
        .attr('fill', (_, i) => d3.schemeSet2[i % 3])
        .on('click', (_, d: any) => {
          console.log(d.properties.name)
        })

      draw
        .join('text')
        .attr('x', (d: any) => {
          const v = projection(d.properties.centroid ?? [0, 0])?.[0] ?? 0
          return v
        })
        .attr('y', (d: any) => {
          const v = projection(d.properties.centroid ?? [0, 0])?.[1] ?? 0
          return v
        })
        .attr('font-size', 12)
        .text((d: any) => {
          console.log(d.properties.name)
          return d.properties.name
        })
    })
  }, [height, width])

  return (
    <div ref={$container} className="w-full h-full">
      <svg ref={$svg}></svg>
    </div>
  )
}

export default D3Map
