import 'antd/dist/reset.css';
import './assets/css/antd.min.css';

import { Breadcrumb, Layout, Menu } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';

//@ts-ignore
const PagePathsWithComponents = import.meta.glob('./pages/*.tsx', {
  eager: true,
});
//Example Output:
// const modules = {
//   './pages/About.tsx': () => import('./pages/About.js'),
//   './pages/Home.tsx': () => import('./pages/Home.tsx')
// }

const routes = Object.keys(PagePathsWithComponents).map((path: string) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  return {
    name,
    path: name === 'Home' ? '/' : `/${name?.toLowerCase()}`,
    component: PagePathsWithComponents[path].default,
  };
});

export function App() {
  return (
    <>
      <Layout>
        <Layout.Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className='demo-logo' />
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={['2']}
            items={routes.map(({ name, path }, index) => ({
              key: String(index + 1),
              label: <Link to={path}>{name}</Link>,
            }))}
          />
        </Layout.Header>
        <Layout.Content className='site-layout' style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 380, background: '#fff' }}>
            <Routes>
              {routes.map(({ path, component: RouteComp }) => {
                return <Route key={path} path={path} element={<RouteComp />} />;
              })}
            </Routes>
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </>
  );
}
