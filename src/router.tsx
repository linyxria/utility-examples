import { createBrowserRouter } from 'react-router-dom'

import App from './routes/app'
import D3Map from './routes/app/d3'
import EchartsMap from './routes/app/echarts'
import GridLayout from './routes/app/grid-layout'
import Overview from './routes/app/overview'
import ThreeMap from './routes/app/three'
import ErrorPage from './routes/error-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'echarts', element: <EchartsMap /> },
      { path: 'd3', element: <D3Map /> },
      { path: 'three', element: <ThreeMap /> },
      { path: 'grid-layout', element: <GridLayout /> },
    ],
  },
])

export default router
