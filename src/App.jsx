import { lazy, Suspense, useMemo } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { LazyLoading } from './components'
import { useSelector } from 'react-redux'

const lazyLoad = moduleName => {
  const Module = lazy(() => import(`@/views/${moduleName}/${moduleName}.jsx`))
  return (
    <Suspense fallback={<LazyLoading />}>
      <Module />
    </Suspense>
  )
}

const staticRoutes = [
  { path: '/', element: <Navigate to="/login" /> },
  { path: '/login', element: lazyLoad('Login') },
  { path: "/home", element: lazyLoad('Home'), meta: { needAuth: true } },
  { path: '/updatepwd', element: lazyLoad('UpdatePwd') },
  { path: "*", element: lazyLoad('NotFound') }
]

function App() {
  const dynamicRoutes = useSelector(state => state.dashboard.dynamicRoutes)
  const routes = useMemo(() => {
    if (dynamicRoutes.length > 0) {
      staticRoutes[2].children = []
      dynamicRoutes.forEach(route => {
        staticRoutes[2].children.push({ path: `/home${route.path}`, element: lazyLoad(route.moduleName) })
      })
    }
    return staticRoutes;
  }, [dynamicRoutes])

  return (<>{useRoutes(routes)}</>)
}

export default App
