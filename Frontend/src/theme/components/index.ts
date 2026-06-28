import type { Components } from '@mui/material/styles';

import InterBoldTTF from '@assets/fonts/inter/Inter-Bold.ttf';
import InterBoldWOFF2 from '@assets/fonts/inter/Inter-Bold.woff2';
import InterMediumTTF from '@assets/fonts/inter/Inter-Medium.ttf';
import InterMediumWOFF2 from '@assets/fonts/inter/Inter-Medium.woff2';
import InterRegularTTF from '@assets/fonts/inter/Inter-Regular.ttf';
import InterRegularWOFF2 from '@assets/fonts/inter/Inter-Regular.woff2';
import InterSemiBoldTTF from '@assets/fonts/inter/Inter-SemiBold.ttf';
import InterSemiBoldWOFF2 from '@assets/fonts/inter/Inter-SemiBold.woff2';

const fontFaceDeclarations = `
       @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url(${InterRegularWOFF2}) format('woff2'), 
        url(${InterRegularTTF}) format('truetype');
      }

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterMediumWOFF2}) format('woff2'), 
        url(${InterMediumTTF}) format('truetype');
      }

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        src: url(${InterSemiBoldWOFF2}) format('woff2'), 
        url(${InterSemiBoldTTF}) format('truetype');
      }

      @font-face {
        font-display: swap; 
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: url(${InterBoldWOFF2}) format('woff2'), 
        url(${InterBoldTTF}) format('truetype');
      }
    `;

export const components: Components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                fontSize: '62.5%',
            },
            fontFaceDeclarations,
        },
    },
    MuiButton: {
        styleOverrides: {
            contained: {
                padding: '0.8rem 1.6rem',
                borderRadius: '0.8rem',
                justifyContent: 'center',
                alignItems: 'center',
                textTransform: 'none',
            },
        },
    },
};
