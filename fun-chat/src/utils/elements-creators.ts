import { User, UserFromResponse } from '../app/interfaces';
import socket from '../services/socket';

export function createInput(attributesPairs: string[][]): HTMLInputElement {
  const input = document.createElement('input');
  attributesPairs.forEach(([key, value]) => input.setAttribute(key, value));
  return input;
}

export function createLabel(text: string, forValue: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.textContent = text;
  label.setAttribute('for', forValue);
  return label;
}

export function createButton(
  attributesPairs: string[][],
  { textContent = 'Login', className = 'button' },
): HTMLButtonElement {
  const button = document.createElement('button');
  attributesPairs.forEach(([key, value]) => button.setAttribute(key, value));
  button.textContent = textContent;
  button.className = className;
  return button;
}

export function createElement(
  classname: string,
  tag = 'div',
): HTMLElement | HTMLDivElement | HTMLLinkElement | HTMLFormElement {
  const el = document.createElement(tag);
  el.className = classname;
  return el;
}

export default function getSvg(where: HTMLElement) {
  where.insertAdjacentHTML(
    'afterbegin',
    '<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n' +
      ' width="40px" height="40px" viewBox="0 0 224.000000 224.000000"\n' +
      ' preserveAspectRatio="xMidYMid meet">\n' +
      '<g transform="translate(0.000000,224.000000) scale(0.100000,-0.100000)"\n' +
      'fill="#000000" stroke="none">\n' +
      '<path d="M970 2231 c-400 -59 -738 -322 -887 -692 -61 -151 -77 -237 -77 -419\n' +
      '0 -140 4 -179 23 -254 111 -428 409 -726 837 -837 75 -19 114 -23 254 -23 140\n' +
      '0 179 4 254 23 428 111 726 409 837 837 19 75 23 114 23 254 0 140 -4 179 -23\n' +
      '254 -110 427 -412 729 -836 836 -90 23 -313 34 -405 21z m20 -762 c119 -19\n' +
      '178 -96 166 -213 -8 -75 -40 -120 -117 -158 -30 -15 -46 -28 -37 -28 34 0 85\n' +
      '-61 146 -173 34 -63 62 -119 62 -126 0 -7 -37 -11 -119 -11 l-118 0 -64 121\n' +
      'c-75 143 -97 169 -139 169 l-30 0 0 -145 0 -145 -110 0 -110 0 0 360 0 360\n' +
      '203 0 c111 0 231 -5 267 -11z m793 -19 c68 -26 122 -77 139 -132 6 -21 9 -40\n' +
      '7 -42 -2 -2 -57 -6 -121 -9 -107 -5 -118 -4 -118 12 0 33 -46 64 -103 69 -46\n' +
      '4 -57 1 -82 -20 -24 -21 -26 -27 -16 -46 12 -22 37 -31 161 -57 157 -33 238\n' +
      '-71 278 -131 73 -112 5 -254 -148 -306 -85 -30 -282 -32 -373 -5 -89 27 -159\n' +
      '101 -180 188 -7 26 -6 26 61 32 37 4 90 7 118 7 48 0 51 -1 67 -38 9 -20 30\n' +
      '-45 47 -55 41 -25 119 -27 153 -4 84 55 34 119 -113 146 -155 28 -266 87 -295\n' +
      '158 -20 48 -19 79 6 131 45 92 162 134 359 127 67 -2 112 -10 153 -25z"/>\n' +
      '<path d="M740 1266 l0 -76 74 0 c90 0 126 21 126 74 0 52 -27 69 -120 74 l-80\n' +
      '5 0 -77z"/>\n' +
      '</g>\n' +
      '</svg>',
  );
}

export function getHistoryForCertainUser(idValue: string, user: UserFromResponse) {
  socket.send(
    JSON.stringify({
      id: idValue,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: user.login,
        },
      },
    }),
  );
}

export function getHistoryFromAllUsers(param: User, str: 'active' | 'inactive') {
  const arrayForGetHistory = str === 'active' ? param.activeUsers : param.inactiveUsers;
  const idValue = str === 'active' ? 'mfau' : 'mfia';
  arrayForGetHistory.forEach((user) => getHistoryForCertainUser(idValue, user));
}
