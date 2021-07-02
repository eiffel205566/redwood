module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      right: {
        30: '7.5rem',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
        '-11': '-11',
        '-12': '-12',
        '-13': '-13',
        50: '50',
        1: '1',
        2: '2',
        3: '3',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        sideDark: '#252525',
        overlay: '#3a3a3a',
        danger: '#e3342f',
        golden: '#ffda00',
      }),
      textColor: (theme) => ({
        ...theme('colors'),
        displayOnly: '#7e7e7e',
        golden: '#ffda00',
      }),
      translate: {
        // '-5.5': '-1.498rem',
        '-1/5': '-20%',
        '-2/5': '-40%',
        '-3/5': '-60%',
        '-4/5': '-80%',
        '-1p': '-24px',
        '-2p': '-48px',
        '-3p': '-72px',
        '-4p': '-96px',
        '-5p': '-120px',
        '-6p': '-144px',
        '-7p': '-168px',
        '-8p': '-192px',
        '-9p': '-216px',
        '-10p': '-240px',
        '-11p': '-264px',
        '-12p': '-288px',
        '-13p': '-312px',
        '-14p': '-336px',
        '-15p': '-360px',
        '-16p': '-384px',
        '-17p': '-408px',
        '-18p': '-432px',
        '-19p': '-456px',
        '-20p': '-480px',
        '-21p': '-504px',
        '-22p': '-528px',
        '-23p': '-552px',
        '-24p': '-576px',
        '-25p': '-600px',
        '-26p': '-624px',
        '-27p': '-648px',
        '-28p': '-672px',
        '-29p': '-696px',
        '-30p': '-720px',
        '-31p': '-744px',
        '-32p': '-768px',
        '-33p': '-792px',
        '-34p': '-816px',
        '-35p': '-840px',
        '-36p': '-864px',
        '-37p': '-888px',
        '-38p': '-912px',
        '-39p': '-936px',
        '-40p': '-960px',
        '-41p': '-984px',
        '-42p': '-1008px',
        '-43p': '-1032px',
        '-44p': '-1056px',
        '-45p': '-1080px',
        '-46p': '-1104px',
        '-47p': '-1128px',
        '-48p': '-1152px',
        '-49p': '-1176px',
        '-50p': '-1200px',
        '-51p': '-1224px',
        '-52p': '-1248px',
        '-53p': '-1272px',
        '-54p': '-1296px',
        '-55p': '-1320px',
        '-56p': '-1344px',
        '-57p': '-1368px',
        '-58p': '-1392px',
        '-59p': '-1416px',
        '-60p': '-1440px',
        '-61p': '-1464px',
        '-62p': '-1488px',
        '-63p': '-1512px',
        '-64p': '-1536px',
        '-65p': '-1560px',
        '-66p': '-1584px',
        '-67p': '-1608px',
        '-68p': '-1632px',
        '-69p': '-1656px',
        '-70p': '-1680px',
        '-71p': '-1704px',
        '-72p': '-1728px',
        '-73p': '-1752px',
        '-74p': '-1776px',
        '-75p': '-1800px',
        '-76p': '-1824px',
        '-77p': '-1848px',
        '-78p': '-1872px',
        '-79p': '-1896px',
        '-80p': '-1920px',
        '-81p': '-1944px',
        '-82p': '-1968px',
        '-83p': '-1992px',
        '-84p': '-2016px',
        '-85p': '-2040px',
        '-86p': '-2064px',
        '-87p': '-2088px',
        '-88p': '-2112px',
        '-89p': '-2136px',
        '-90p': '-2160px',
        '-91p': '-2184px',
        '-92p': '-2208px',
        '-93p': '-2232px',
        '-94p': '-2256px',
        '-95p': '-2280px',
        '-96p': '-2304px',
        '-97p': '-2328px',
        '-98p': '-2352px',
        '-99p': '-2376px',
        '-100p': '-2400px',

        '-3p': '-72px',
        '-112': '-28rem',
        '-128': '-32rem',
        '-144': '-36rem',
        '-160': '-40rem',
        '-176': '-44rem',
        '-192': '-48rem',
        '-208': '-52rem',
        '-224': '-56rem',
        '-240': '-60rem',
        '-256': '-64rem',
        '-272': '-68rem',
        '-288': '-72rem',
        '-304': '-76rem',
        '-320': '-80rem',
        '-336': '-84rem',
        '-352': '-88rem',
        '-368': '-92rem',
        '-384': '-96rem',
        '-400': '-100rem',
        '-416': '-104rem',
        '-432': '-108rem',
        '-448': '-112rem',
        '-464': '-116rem',
        '-480': '-120rem',
        '-496': '-124rem',
        '-512': '-128rem',
        '-528': '-132rem',
        '-544': '-136rem',
        '-560': '-140rem',
        '-576': '-144rem',
        '-592': '-148rem',
        '-608': '-152rem',
        '-624': '-156rem',
        '-640': '-160rem',
        '-656': '-164rem',
        '-672': '-168rem',
        '-688': '-172rem',
        '-704': '-176rem',
        '-720': '-180rem',
        '-736': '-184rem',
        '-752': '-188rem',
        '-768': '-192rem',
        '-784': '-196rem',
        '-800': '-200rem',
        '-816': '-204rem',
        '-832': '-208rem',
        '-848': '-212rem',
        '-864': '-216rem',
        '-880': '-220rem',
        '-896': '-224rem',
        '-912': '-228rem',
        '-928': '-232rem',
        '-944': '-236rem',
        '-960': '-240rem',
        '-976': '-244rem',
        '-992': '-248rem',
        '-1008': '-252rem',
        '-1024': '-256rem',
        '-1040': '-260rem',
        '-1056': '-264rem',
        '-1072': '-268rem',
        '-1088': '-272rem',
        '-1104': '-276rem',
        '-1120': '-280rem',
        '-1136': '-284rem',
        '-1152': '-288rem',
        '-1168': '-292rem',
        '-1184': '-296rem',
        '-1200': '-300rem',
        '-1216': '-304rem',
        '-1232': '-308rem',
        '-1248': '-312rem',
        '-1264': '-316rem',
        '-1280': '-320rem',
        '-1296': '-324rem',
        '-1312': '-328rem',
        '-1328': '-332rem',
        '-1344': '-336rem',
        '-1360': '-340rem',
        '-1376': '-344rem',
        '-1392': '-348rem',
        '-1408': '-352rem',
        '-1424': '-356rem',
        '-1440': '-360rem',
        '-1456': '-364rem',
        '-1472': '-368rem',
        '-1488': '-372rem',
        '-1504': '-376rem',
        '-1520': '-380rem',
        '-1536': '-384rem',
        '-1552': '-388rem',
        '-1568': '-392rem',
        '-1584': '-396rem',
        '-1600': '-400rem',
        '-1616': '-404rem',
        '-1632': '-408rem',
        '-1648': '-412rem',
        '-1664': '-416rem',
        '-1680': '-420rem',
        '-1696': '-424rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}

//#7e7e7e
