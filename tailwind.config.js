// CRAFT.DO
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {

      //   background: '#f6f1e8',
      //   surface: '#fbf7f2',
      //   softSurface: '#f3ede3',

      //   primaryText: '#2f2a24',
      //   secondaryText: '#6e6458',

      //   accent: '#7c8f7a',
      //   accentSoft: '#d8e0d2',

      //   borderSoft: 'rgba(80, 60, 40, 0.08)',
      // },

        background: '#f6f1e8',
        surface: '#fbf7f2',
        surfaceSoft: '#f3ede3',

        primary: '#7c8f7a',
        primarySoft: '#d8e0d2',

        primaryText: '#2f2a24',
        secondaryText: '#6e6458',

        borderSoft: 'rgba(80, 60, 40, 0.08)'
      },

      boxShadow: {
        soft:
          '0px 10px 30px rgba(84,67,48,0.06), 0px 2px 10px rgba(84,67,48,0.04)',

        hover:
          '0px 20px 45px rgba(84,67,48,0.10), 0px 4px 14px rgba(84,67,48,0.06)',
      },

      borderRadius: {
        soft: '20px',
        card: '28px',
      },
    },
    plugins: []
  }
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#5B8CFF',
//         secondary: '#A7C5FF',
//         accent: '#73D7FF',
//         background: '#F4F7FF',
//         surface: '#FFFFFF',
//         dark: '#18253B',
//         softText: '#64748B',
//         borderSoft: '#DCE7FF'
//       },
//       boxShadow: {
//         soft: '0 10px 40px rgba(91, 140, 255, 0.12)',
//         card: '0 8px 30px rgba(15, 23, 42, 0.08)'
//       },
//       borderRadius: {
//         xl2: '24px'
//       },
//       backgroundImage: {
//         heroGradient:
//           'linear-gradient(135deg, rgba(91,140,255,0.18), rgba(115,215,255,0.12))'
//       }
//     }
//   },
//   plugins: []
// }