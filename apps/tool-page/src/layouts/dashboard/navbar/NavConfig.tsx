// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import { PATH_DASHBOARD } from "@/routes/paths";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '基础',
    items: [
      {
        title: '账号货币信息',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: '货币',
    items: [
      { title: '单币批量转移', path: '/dashboard/token/single-token-multi-transfer', icon: ICONS.ecommerce },
      { title: '多币批量转移', path: '/dashboard/token/single-address-multi-transfer', icon: ICONS.ecommerce },
      { title: '货币批量归集', path: '/dashboard/token/multi-account-token-transfer', icon: ICONS.ecommerce },
    ],
  },

  {
    subheader: 'NFT',
    items: [
      { title: 'NFT批量转移', path: PATH_DASHBOARD.nft.nftMultiTransfer, icon: ICONS.ecommerce },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
