import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { useScaler } from '@scale-adjust/react'
import { useRef } from 'react'
import GridLayout from 'react-grid-layout'

const layout = [
  { i: 'a', x: 0, y: 0, w: 3, h: 1 },
  { i: 'b', x: 3, y: 0, w: 3, h: 1 },
  { i: 'c', x: 6, y: 0, w: 3, h: 1 },
]

const originWidth = 1270
const originHeight = 1080
const rowHeight = 360
const maxRows = Math.floor(originHeight / rowHeight)

const MyGridLayout = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scale } = useScaler(ref.current, {
    originWidth: 1920,
    originHeight: 1080,
  })
  console.log(scale, 'scale')

  return (
    <div ref={ref} className="bg-indigo-300">
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={rowHeight}
        width={originWidth}
        maxRows={maxRows}
        compactType={null}
        // preventCollision={false}
        // isBounded
        // resizeHandles={['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w']}
      >
        <div key="a" className="bg-pink-300">
          a
        </div>
        <div key="b" className="bg-purple-300">
          b
        </div>
        <div key="c" className="bg-sky-300">
          c
        </div>
      </GridLayout>
    </div>
  )
}

export default MyGridLayout
