import { Fragment } from 'react'
export const Calculator = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const Money = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const ChevronRight = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>
  )
}

export const Garbage = ({ className, onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  )
}

export const HeartOutline = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

export const Customize = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  )
}

export const Spin = ({ className, onMouseOver, onClick }) => {
  return (
    <svg
      onClick={onClick}
      onMouseOver={onMouseOver}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

export const Calender = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  )
}

export const Cog = ({ className }) => {
  return (
    <div>
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
  )
}

export const Delete = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  )
}

export const Dots = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
      />
    </svg>
  )
}

export const Sun = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

export const Moon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

export const Edit = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  )
}

export const Plus = ({ className, onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const Check = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const Left = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )
}
export const Right = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}
export const Cancel = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export const Clock = ({ className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

const ClockByNumber = ({ className, onClick, d }) => {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={d}
      />
    </svg>
  )
}

export const ClockLoading = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <ClockByNumber
        d="M 12 7 V 12 M 21 12 A 9 9 0 1 1 3 12 A 9 9 0 0 1 21 12 Z"
        className={`${className} text-gray-300 absolute animate-spin`}
      />
      <ClockByNumber
        d="M 12 9 V 12 M 21 12 A 9 9 0 1 1 3 12 A 9 9 0 0 1 21 12 Z"
        className={`${className} text-gray-300 absolute animate-spin-slow`}
      />
    </div>
  )
}

export const LoadingIndicator = ({ className }) => {
  return (
    <svg
      className={`${className} animate-spin -ml-1 mr-3 h-5 w-5 text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export const Puipui = ({ className, ...rest }) => {
  const { onClick } = rest || {}
  return (
    <svg
      onClick={onClick}
      className={className}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="200.000000pt"
      height="200.000000pt"
      viewBox="0 0 200.000000 200.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          d="M985 1713 c-222 -11 -430 -72 -531 -156 -19 -16 -47 -26 -84 -30 -75
   -8 -197 -71 -227 -116 -34 -50 -30 -96 9 -135 l33 -33 -27 -53 c-111 -223
   -111 -492 0 -609 30 -31 36 -45 34 -71 -7 -70 48 -154 114 -174 12 -4 49 -7
   82 -7 78 -1 122 24 154 89 l24 47 120 -3 121 -3 13 -42 c27 -90 77 -126 182
   -129 50 -2 71 2 99 19 39 25 79 88 79 126 0 25 2 26 80 29 78 3 81 2 101 -25
   28 -38 93 -67 150 -67 26 0 66 -9 91 -20 47 -20 154 -29 198 -15 111 34 166
   200 107 317 -20 39 -21 49 -10 75 35 87 35 283 -1 438 -62 265 -307 504 -546
   534 -87 11 -279 18 -365 14z m290 -52 c67 -6 133 -18 166 -30 63 -24 155 -85
   222 -148 25 -23 47 -39 51 -36 6 6 45 -36 46 -50 0 -5 -13 0 -30 10 -16 9 -30
   21 -30 26 0 17 -71 37 -129 37 -108 0 -218 -56 -247 -127 -15 -36 -19 -180 -5
   -202 7 -11 25 -12 112 -1 72 9 145 10 239 5 74 -5 147 -9 161 -9 26 -1 27 -4
   38 -81 15 -106 14 -187 -3 -258 -16 -68 -20 -74 -40 -58 -27 23 -142 31 -196
   15 -79 -23 -140 -111 -140 -201 0 -30 -2 -31 -57 -36 -32 -4 -100 -7 -152 -8
   l-94 -2 -13 39 c-30 86 -83 124 -177 124 -99 0 -150 -37 -177 -127 l-13 -43
   -66 1 c-87 1 -160 12 -144 22 10 6 6 18 -12 47 -14 22 -25 45 -25 52 0 7 21
   32 47 55 l48 41 -24 26 c-22 23 -32 26 -96 26 -64 0 -74 -3 -96 -26 l-24 -26
   50 -43 50 -44 -30 -56 -30 -56 -55 6 c-123 15 -210 68 -252 153 -20 41 -23 62
   -23 162 1 133 16 202 74 325 38 82 39 83 97 106 52 20 76 23 209 23 124 0 163
   -4 228 -22 84 -24 163 -60 214 -98 17 -13 36 -24 42 -24 6 0 11 -21 11 -47 0
   -73 17 -118 56 -152 39 -35 70 -39 119 -16 45 22 60 56 59 134 -3 95 -62 241
   -99 241 -26 0 -28 -28 -6 -56 28 -35 61 -145 61 -200 0 -65 -41 -99 -95 -78
   -55 21 -66 176 -21 306 31 90 32 115 9 148 -26 37 -41 48 -128 90 -102 49
   -216 74 -302 67 -80 -6 -71 3 27 31 168 48 364 62 595 43z m-687 -95 c-9 -6
   -101 -26 -104 -23 -2 2 17 15 43 30 41 22 49 24 56 11 5 -9 7 -16 5 -18z m226
   -42 c85 -22 203 -80 223 -110 19 -29 10 -82 -26 -166 l-20 -48 -46 31 c-59 40
   -148 75 -238 95 -100 23 -316 23 -377 1 -24 -9 -46 -15 -48 -13 -2 2 37 45 86
   96 78 79 97 94 148 110 75 24 213 26 298 4z m-399 -34 c-3 -5 -13 -10 -21 -10
   -8 0 -14 5 -14 10 0 6 9 10 21 10 11 0 17 -4 14 -10z m-93 -58 c-27 -28 -62
   -71 -78 -96 -30 -48 -42 -54 -62 -34 -22 22 -14 72 17 102 24 23 160 88 169
   81 2 -2 -19 -25 -46 -53z m1345 -24 c77 -33 109 -65 146 -147 20 -44 37 -82
   37 -84 0 -3 -21 0 -47 5 -68 14 -381 14 -415 0 l-28 -12 0 78 c0 48 5 84 13
   94 17 21 67 53 102 66 41 14 158 15 192 0z m-1418 -135 c-56 -31 -59 -29 -19
   11 26 26 38 32 48 24 10 -9 3 -16 -29 -35z m771 -95 c0 -16 -3 -19 -11 -11 -6
   6 -8 16 -5 22 11 17 16 13 16 -11z m-420 -449 c-68 -55 -68 -55 -103 -23 -18
   16 -36 32 -41 36 -6 5 30 8 80 8 l89 0 -25 -21z m1076 -14 c-27 -22 -31 -22
   -42 -7 -10 14 -10 18 4 24 9 4 28 7 42 7 l25 0 -29 -24z m-73 -47 c-23 -33
   -28 -55 -31 -114 -4 -64 -1 -79 21 -119 32 -56 17 -59 -20 -4 -53 81 -38 216
   29 263 32 22 32 21 1 -26z m213 23 c66 -40 91 -167 48 -241 -25 -43 -78 -80
   -114 -80 -70 0 -134 81 -135 170 0 99 56 170 135 170 19 0 49 -9 66 -19z
   m-1276 -41 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4
   11 -10z m425 -25 c-16 -14 -36 -25 -42 -25 -23 0 -47 -63 -47 -120 0 -33 7
   -68 17 -87 18 -35 10 -46 -10 -14 -39 62 -35 152 9 213 11 16 16 28 11 28 -20
   1 45 28 67 29 l25 0 -30 -24z m120 -27 c93 -73 62 -247 -46 -264 -61 -10 -119
   58 -119 141 0 75 53 145 110 145 15 0 40 -10 55 -22z m-545 -8 c0 -5 -5 -10
   -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m14 -78 c-7 -2 -23
   -2 -34 0 -19 3 -20 4 -5 26 l16 22 19 -22 c15 -19 16 -24 4 -26z m-264 8 c0
   -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m-29
   -48 c4 -32 14 -50 45 -76 32 -29 35 -35 19 -35 -22 -1 -50 14 -50 26 -1 4 -7
   19 -15 33 -19 35 -31 102 -16 97 6 -2 14 -22 17 -45z m164 23 c17 -1 36 2 43
   8 7 5 15 7 18 4 9 -9 -59 -41 -81 -38 -11 1 -29 12 -40 23 l-20 21 25 -7 c14
   -4 39 -9 55 -11z m-66 -36 c26 -34 62 -38 91 -9 24 24 60 27 60 4 0 -29 -65
   -84 -99 -84 -40 0 -99 53 -107 97 -6 28 -4 31 14 27 11 -3 29 -19 41 -35z
   m191 27 c0 -11 -19 -15 -25 -6 -3 5 1 10 9 10 9 0 16 -2 16 -4z m630 -6 c0 -5
   -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m205 0
   c-3 -5 -10 -10 -16 -10 -5 0 -9 5 -9 10 0 6 7 10 16 10 8 0 12 -4 9 -10z m69
   -8 c-5 -17 29 -62 46 -62 6 0 10 -4 10 -9 0 -5 -15 -5 -34 -1 -36 8 -93 62
   -74 69 6 2 15 -4 20 -13 5 -9 14 -16 20 -16 6 0 3 11 -6 25 -16 24 -15 25 3
   25 13 0 18 -5 15 -18z m70 -51 c-2 -3 -15 6 -29 19 -18 17 -22 26 -13 31 11 7
   50 -40 42 -50z m36 -22 c0 -5 -7 -9 -15 -9 -15 0 -20 12 -9 23 8 8 24 -1 24
   -14z m105 -19 c23 -26 18 -29 -23 -18 -28 7 -32 11 -22 23 16 20 23 19 45 -5z
   m-720 -58 c-25 -5 -48 18 -34 34 10 12 15 10 31 -8 18 -20 18 -23 3 -26z"
        />
        <path
          d="M281 1064 c-50 -41 -38 -104 23 -129 77 -32 149 34 120 110 -8 20
   -56 45 -88 45 -13 0 -38 -12 -55 -26z m57 -27 c4 -20 -25 -34 -40 -19 -15 15
   -1 44 19 40 10 -2 19 -11 21 -21z m57 -3 c20 -20 14 -40 -11 -36 -11 2 -27 -7
   -39 -22 -19 -24 -22 -25 -43 -10 -27 19 -30 39 -4 25 24 -13 62 12 62 40 0 23
   13 24 35 3z m-7 -65 c-2 -6 -8 -10 -13 -10 -5 0 -11 4 -13 10 -2 6 4 11 13 11
   9 0 15 -5 13 -11z"
        />
        <path
          d="M780 1083 c-76 -28 -79 -118 -6 -148 77 -32 149 34 120 110 -12 31
   -75 52 -114 38z m18 -51 c3 -16 -2 -22 -17 -22 -24 0 -35 15 -27 36 9 23 40
   13 44 -14z m74 -6 c16 -23 8 -36 -16 -30 -18 4 -28 0 -38 -15 -15 -25 -41 -27
   -59 -5 -12 15 -11 16 7 10 25 -8 70 35 60 59 -5 13 -2 14 17 4 12 -7 25 -17
   29 -23z m-14 -57 c-2 -6 -8 -10 -13 -10 -5 0 -11 4 -13 10 -2 6 4 11 13 11 9
   0 15 -5 13 -11z"
        />
        <path
          d="M182 884 c-25 -18 -53 -62 -30 -49 7 5 23 17 36 28 12 11 22 16 22
   10 0 -13 -43 -53 -58 -53 -7 0 -12 -4 -12 -10 0 -20 27 -9 59 24 21 22 31 41
   28 50 -8 20 -17 20 -45 0z"
        />
        <path
          d="M246 861 c-36 -37 -41 -61 -12 -61 21 0 79 67 73 84 -9 24 -19 20
   -61 -23z m24 -16 c-12 -13 -27 -22 -32 -19 -4 3 2 14 14 24 33 28 46 24 18 -5z"
        />
        <path
          d="M332 867 c-33 -34 -42 -67 -19 -67 7 0 30 17 50 38 29 30 34 41 25
   50 -17 17 -20 16 -56 -21z m23 -17 c-16 -16 -31 -28 -33 -25 -7 7 39 55 52 55
   5 0 -3 -13 -19 -30z"
        />
        <path
          d="M773 884 c-6 -17 52 -84 73 -84 29 0 24 24 -12 61 -42 43 -52 47 -61
   23z m67 -53 c0 -11 -3 -11 -16 -1 -8 8 -20 22 -26 33 -10 19 -10 19 16 1 14
   -11 26 -25 26 -33z"
        />
        <path
          d="M855 890 c-8 -12 39 -78 62 -87 8 -3 19 -1 26 6 8 8 3 21 -20 48 -32
   40 -56 52 -68 33z m59 -39 c26 -29 2 -34 -24 -6 -18 19 -20 25 -8 25 8 0 23
   -9 32 -19z"
        />
        <path
          d="M937 886 c-6 -15 61 -86 81 -86 23 0 12 36 -21 68 -36 35 -52 40 -60
   18z m58 -36 c16 -16 24 -30 17 -30 -13 0 -52 39 -52 52 0 13 4 10 35 -22z"
        />
        <path
          d="M1705 605 c-50 -49 -23 -145 41 -145 61 0 95 55 70 115 -24 58 -71
   71 -111 30z m65 -40 c10 -12 10 -21 2 -40 -15 -32 -29 -32 -44 0 -8 19 -8 28
   2 40 16 19 24 19 40 0z"
        />
        <path
          d="M985 530 c-41 -46 -12 -130 45 -130 36 0 64 33 64 75 0 42 -28 75
   -64 75 -15 0 -35 -9 -45 -20z m60 -41 c5 -13 1 -27 -8 -37 -14 -14 -16 -13
   -22 11 -11 43 17 67 30 26z"
        />
      </g>
    </svg>
  )
}

/*

<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

*/

const Test = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1090"
      width="1920"
      height="1090"
      preserveAspectRatio="xMidYMid meet"
      style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"
    ></svg>
  )
}

export const Sunshining = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 752 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <g className="testingGroup transform transition-all duration-500 ease-in-out">
          <svg
            x="71"
            y="24"
            xmlns="http://www.w3.org/2000/svg"
            width="80px"
            height="80px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <g transform="rotate(0 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(30 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(60 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(90 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(120 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(150 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(180 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(210 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(240 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(270 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(300 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
            <g transform="rotate(330 50 50)">
              <rect
                x="47"
                y="24"
                rx="3"
                ry="6"
                width="6"
                height="12"
                fill="#ffd700"
              >
                <animate
                  attributeName="height"
                  values="12;12;12;12;12;12;12;12;12;12;12;12;12;0;0;12;12;12;12;12;12;12;12;12;12;12;12;12;12;12"
                  dur="6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0;0;0;0;0;0;0;0;0;0;0.5;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0.0;0;0;0"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>
          <path
            transform="translate(100,50)"
            fill="white"
            d="M5.003,22h4h6h4c1.103,0,2-0.897,2-2v-9c0-0.265-0.105-0.52-0.293-0.707l-8-8c-0.391-0.391-1.023-0.391-1.414,0l-8,8 C3.108,10.48,3.003,10.735,3.003,11v9C3.003,21.103,3.9,22,5.003,22z M10.003,20v-5h4v5H10.003z M5.003,11.414l7-7l7,7L19.004,20 h-3.001v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5h-3V11.414z"
          ></path>
        </g>

        <path
          transform="translate(100,110)"
          fill="white"
          d="M20,3H4C2.897,3,2,3.897,2,5v11c0,1.103,0.897,2,2,2h7v2H8v2h3h2h3v-2h-3v-2h7c1.103,0,2-0.897,2-2V5 C22,3.897,21.103,3,20,3z M4,14V5h16l0.002,9H4z"
        ></path>
        <path
          transform="translate(100,170)"
          fill="white"
          d="M17,2H7C5.897,2,5,2.897,5,4v16c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V4C19,2.897,18.103,2,17,2z M7,16.999V5h10 l0.002,11.999H7z"
        ></path>
      </g>
      <rect x="150" y="52" width="200" height="20" fill="gray"></rect>
      <rect x="150" y="52" width="100" height="20" fill="green">
        <animate
          attributeName="width"
          values="0;0;0;0;0;0;0;0;20;40;60;80;100;100;100"
          dur="6s"
          fill="freeze"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}
