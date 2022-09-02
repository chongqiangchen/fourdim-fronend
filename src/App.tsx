// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import NotistackProvider from './components/NotistackProvider';

// web3
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Chains } from './constants/chain';

// store
import { RecoilRoot } from 'recoil';


// ----------------------------------------------------------------------

const { chains, provider, webSocketProvider } = configureChains(
  Chains,
  [
    publicProvider(),
  ]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export default function App() {
  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <MotionLazyContainer>
          <ThemeProvider>
            <NotistackProvider>
              <ThemeSettings>
                <ProgressBarStyle />
                <ScrollToTop />
                <Router />
              </ThemeSettings>
            </NotistackProvider>
          </ThemeProvider>
        </MotionLazyContainer>
      </WagmiConfig>
    </RecoilRoot>
  );
}
