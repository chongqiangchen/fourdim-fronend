import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard/home" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace />, index: true },
        { path: 'home', element: <PageHome /> },
        {
          path: 'token',
          children: [
            {path: 'single-token-multi-transfer', element: <SingleTokenMultiTransfer />},
            {path: 'single-address-multi-transfer', element: <SingleAddressMultiTransfer />},
            {path: 'multi-account-token-transfer', element: <MultiAccountTokenTransfer />},
          ]
        },
        {
          path: 'nft',
          children: [
            {path: 'nft-multi-transfer', element: <NftMultiTransfer />},
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/four" replace />, index: true },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// token
const SingleTokenMultiTransfer = Loadable(lazy(() => import('../pages/token/SingleTokenMultiTransfer')));
const SingleAddressMultiTransfer = Loadable(lazy(() => import('../pages/token/SingleAddressMultiTransfer')));
const MultiAccountTokenTransfer = Loadable(lazy(() => import('../pages/token/MultiAccountTokenTransfer')));

// nft
const NftMultiTransfer = Loadable(lazy(() => import('../pages/nft/NftMultiTransfer')));
const PageHome = Loadable(lazy(() => import('../pages/PageHome')));
