export default function getFlag(where: HTMLDivElement) {
  where.insertAdjacentHTML(
    'afterbegin',
    '<svg class = "flag" width="30px" height="50px" viewBox="0 0 803.000000 1280.000000" preserveAspectRatio="xMidYMid meet"  fill="#F4F9FC">\n' +
      '        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">\n' +
      '          <path d="M220 12784 c-215 -78 -285 -320 -147 -506 27 -36 82 -74 143 -98 l49 -19 -83 -1 c-79 0 -85 -2 -114 -30 -25 -26 -29 -36 -24 -63 9 -46 37 -68 90 -74 l46 -6 0 -5993 0 -5994 135 0 135 0 0 3781 c0 3021 3 3780 12 3776 281 -125 442 -183 658 -237 544 -137 1122 -146 1845 -30 339 55 527 96 1292 281 748 180 1078 249 1433 298 291 40 390 46 740 46 300 -1 366 -4 510 -23 380 -52 670 -137 1078 -319 9 -4 12 441 12 2209 l0 2214 -131 57 c-433 191 -856 281 -1374 294 -563 14 -1106 -66 -2095 -307 -965 -235 -1332 -312 -1725 -360 -440 -54 -879 -55 -1225 -4 -332 49 -643 139 -927 269 -83 38 -93 45 -65 45 72 0 124 57 103 112 -17 45 -47 58 -136 58 l-80 0 59 25 c85 35 133 80 174 165 54 114 28 263 -62 353 -83 83 -224 118 -326 81z"/>\n' +
      '        </g>\n' +
      '      </svg>',
  );
  const flagSvg = where.firstElementChild as SVGSVGElement;
  return flagSvg;
}
