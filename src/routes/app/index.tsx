import { NavLink, Outlet } from 'react-router-dom'

import { cn } from '~/utils/css'

const menuItems = [
  { path: 'echarts', name: 'Echarts' },
  { path: 'd3', name: 'D3' },
  { path: 'three', name: 'Three' },
  { path: 'grid-layout', name: 'Grid layout' },
]

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <ul className="menu w-56 bg-base-200 my-0 px-0">
        {menuItems.map((item) => {
          return (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn('no-underline text-inherit rounded-none',{ active: isActive })}
              >
                {item.name}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <div className="flex-auto overflow-auto px-6 py-4">
        <Outlet />
      </div>
    </div>
  )
}

export default App
