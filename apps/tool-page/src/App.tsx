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
} from 'wagmi'
import { client } from './conenct';

// store
import { RecoilRoot } from 'recoil';

// ----------------------------------------------------------------------

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
