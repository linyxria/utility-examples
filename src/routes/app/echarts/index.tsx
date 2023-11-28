import { useState } from 'react'

import Breadcrumbs from './breadcrumbs'
import ChoroplethMap from './choropleth-map'

const defaultAdcode = 100000

const EchartsMap = () => {
  const [adcodes, setAdcodes] = useState([defaultAdcode])
  const currentAdcode = adcodes.at(-1) ?? defaultAdcode

  return (
    <div className="w-full h-full relative">
      <Breadcrumbs
        adcodes={adcodes}
        onSelect={(adcode) => {
          if (adcode !== currentAdcode) {
            setAdcodes((prev) => prev.slice(0, prev.indexOf(adcode) + 1))
          }
        }}
      />
      <ChoroplethMap
        adcode={currentAdcode}
        onSubAreaClick={(area) => {
          if (area.level !== 'district') {
            setAdcodes((prev) => [...prev, area.adcode])
          }
        }}
      />
    </div>
  )
}

export default EchartsMap
