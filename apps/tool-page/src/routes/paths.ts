// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------
//
// export const PATH_AUTH = {};
//
// export const PATH_PAGE = {
//   comingSoon: "/coming-soon",
//   maintenance: "/maintenance",
//   pricing: "/pricing",
//   payment: "/payment",
//   about: "/about-us",
//   contact: "/contact-us",
//   faqs: "/faqs",
//   page403: "/403",
//   page404: "/404",
//   page500: "/500",
//   components: "/components"
// };

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, "/home")
  },
  token: {
    singleTokenMultiTransfer: path(ROOTS_DASHBOARD, "/token/single-token-multi-transfer"),
    singleAddressMultiTransfer: path(ROOTS_DASHBOARD, "/token/single-address-multi-transfer"),
    multiAccountTokenTransfer: path(ROOTS_DASHBOARD, "/token/multi-account-token-transfer")
  },
  nft: {
    nftMultiTransfer: path(ROOTS_DASHBOARD, "/nft/nft-multi-transfer")
  }
};

// export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
