import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 180 180">
        <defs>
          <linearGradient id="b" x1="93.063" y1="31.5" x2="97.894" y2="144.293" gradientUnits="userSpaceOnUse">
              <stop stop-color="#05AE58" />
              <stop offset="1" stop-color="#56E282" />
          </linearGradient>
          <linearGradient id="c" x1="58.081" y1="76.56" x2="130.012" y2="142.487" gradientUnits="userSpaceOnUse">
              <stop stop-color="#019355" />
              <stop offset=".433" stop-color="#01AB55" />
              <stop offset="1" stop-color="#56E282" />
          </linearGradient>
          <linearGradient id="d" x1="93.234" y1="80.293" x2="111.972" y2="81.354" gradientUnits="userSpaceOnUse">
              <stop stop-color="#09B15A" />
              <stop offset="1" stop-color="#57E382" />
          </linearGradient>
          <filter id="a" x="28" y="23" width="124.214" height="134.822" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix values="0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0 0.491667 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_741_31556" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_741_31556" result="shape" />
          </filter>
      </defs>
        <g filter="url(#a)" fillRule="evenodd" clipRule="evenodd">
          <path 
            d="M75.752 27.803A59.25 59.25 0 0 0 32.529 71.88a59.253 59.253 0 0 0 4.619 39.655c5.178 10.463 25.198 29.682 31.026 35.155 1.068 1.003 2.202 1.907 3.47 2.642 2.858 1.655 8.59 4.573 14.356 5.167.562.058 14.108.227 22.118.322 1.901.022 2.786-2.383 1.325-3.6-11.424-9.516-41.356-35.357-49.164-51.134a33.426 33.426 0 0 1-2.364-6.306 57.632 57.632 0 0 1-3.874-20.841c0-18.266 8.477-34.552 21.71-45.138z" 
            fill="url(#b)" 
          />
          <path 
            d="M57.714 93.781A57.63 57.63 0 0 1 53.84 72.94c0-18.266 8.477-34.551 21.71-45.138a59.25 59.25 0 0 1 53.506 12.847c10.321 9.024 17.444 20.851 19.444 34.87 2.252 13.521-1.297 25.12-4.067 30.714-2.769 5.594-6.433 10.767-12.877 15.468-5.556 3.299-10.084 4.556-13.584 4.799-1.972.137-2.029 0-4.5 0H109l-3.028-.5c-1.479-.211-3.5-1-5.5-2l-4.667-2.262c-1.553-1.036-.973-3.513.854-3.899 8.622-1.821 15.749-5.928 21.841-15.839 4.052-6.592 5-16 3.5-24-1.271-7.632-5.675-12.907-11.5-18S98.734 52.242 91 52s-15.213 2.03-21.345 6.749A33.444 33.444 0 0 0 57.714 93.78z" 
            fill="url(#c)" 
          />
          <rect x="88.971" y="69" width="24" height="24" rx="6" transform="rotate(45 88.97 69)" fill="url(#d)" />
        </g>
{/* 

        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g> */}
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
