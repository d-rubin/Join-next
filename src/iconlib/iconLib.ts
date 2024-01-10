type IconLibProps = {
  [key: string]: {
    viewBoxWidth: number;
    viewBoxHeight: number;
    path: string[];
    noFill?: true;
    minY?: number;
  };
};

export const iconLib: IconLibProps = {
  addPerson: {
    viewBoxWidth: 33,
    viewBoxHeight: 32,
    path: [
      "M25.3975 18.6667C25.0816 18.6667 24.818 18.5602 24.6069 18.3473C24.3958 18.1343 24.2903 17.8704 24.2903 17.5556V14.4445H21.1791C20.8643 14.4445 20.6004 14.3376 20.3875 14.1239C20.1745 13.9102 20.068 13.6454 20.068 13.3295C20.068 13.0136 20.1745 12.7501 20.3875 12.5389C20.6004 12.3278 20.8643 12.2223 21.1791 12.2223H24.2903V9.11115C24.2903 8.79635 24.3971 8.53246 24.6108 8.31948C24.8245 8.10653 25.0894 8.00005 25.4053 8.00005C25.7212 8.00005 25.9847 8.10653 26.1958 8.31948C26.4069 8.53246 26.5125 8.79635 26.5125 9.11115V12.2223H29.6236C29.9384 12.2223 30.2023 12.3291 30.4153 12.5428C30.6282 12.7566 30.7347 13.0214 30.7347 13.3373C30.7347 13.6532 30.6282 13.9167 30.4153 14.1278C30.2023 14.3389 29.9384 14.4445 29.6236 14.4445H26.5125V17.5556C26.5125 17.8704 26.4056 18.1343 26.1919 18.3473C25.9782 18.5602 25.7134 18.6667 25.3975 18.6667ZM12.068 15.9778C10.6014 15.9778 9.38284 15.4926 8.41247 14.5223C7.44211 13.5519 6.95693 12.3334 6.95693 10.8667C6.95693 9.40005 7.44211 8.18154 8.41247 7.21118C9.38284 6.2408 10.6014 5.75562 12.068 5.75562C13.5347 5.75562 14.7532 6.2408 15.7236 7.21118C16.694 8.18154 17.1791 9.40005 17.1791 10.8667C17.1791 12.3334 16.694 13.5519 15.7236 14.5223C14.7532 15.4926 13.5347 15.9778 12.068 15.9778ZM2.51247 26.6667C2.19767 26.6667 1.93378 26.5602 1.7208 26.3473C1.50784 26.1343 1.40137 25.8704 1.40137 25.5556V23.3334C1.40137 22.563 1.59951 21.8612 1.9958 21.2279C2.39211 20.5945 2.93471 20.1186 3.6236 19.8C5.19398 19.0815 6.64833 18.5649 7.98667 18.25C9.32502 17.9352 10.6843 17.7779 12.0644 17.7779C13.4446 17.7779 14.8051 17.9352 16.1458 18.25C17.4865 18.5649 18.9347 19.0815 20.4903 19.8C21.1792 20.1334 21.7254 20.613 22.1291 21.2389C22.5328 21.8649 22.7347 22.563 22.7347 23.3334V25.5556C22.7347 25.8704 22.6282 26.1343 22.4153 26.3473C22.2023 26.5602 21.9384 26.6667 21.6236 26.6667H2.51247ZM3.62357 24.4445H20.5125V23.3334C20.5125 23.0149 20.4329 22.7149 20.2736 22.4334C20.1143 22.1519 19.8754 21.9408 19.5569 21.8C18.1199 21.0963 16.831 20.6204 15.6903 20.3723C14.5495 20.1241 13.3421 20 12.068 20C10.794 20 9.58656 20.1278 8.4458 20.3834C7.30507 20.6389 6.00878 21.1112 4.55693 21.8C4.26802 21.9408 4.04023 22.1519 3.87357 22.4334C3.7069 22.7149 3.62357 23.0149 3.62357 23.3334V24.4445ZM12.068 13.7556C12.8903 13.7556 13.5773 13.4797 14.1291 12.9278C14.681 12.376 14.9569 11.6889 14.9569 10.8667C14.9569 10.0445 14.681 9.35746 14.1291 8.80562C13.5773 8.25375 12.8903 7.97782 12.068 7.97782C11.2458 7.97782 10.5588 8.25375 10.0069 8.80562C9.45507 9.35746 9.17913 10.0445 9.17913 10.8667C9.17913 11.6889 9.45507 12.376 10.0069 12.9278C10.5588 13.4797 11.2458 13.7556 12.068 13.7556Z",
    ],
  },
  addTask: {
    viewBoxWidth: 30,
    viewBoxHeight: 31,
    path: [
      "M4.62652 28.1682C3.95579 28.1682 3.38161 27.9294 2.90396 27.4517C2.42632 26.9741 2.1875 26.3999 2.1875 25.7292V8.65599C2.1875 7.98526 2.42632 7.41107 2.90396 6.93343C3.38161 6.45578 3.95579 6.21696 4.62652 6.21696H15.5107L13.0716 8.65599H4.62652V25.7292H21.6997V17.2535L24.1387 14.8145V25.7292C24.1387 26.3999 23.8999 26.9741 23.4223 27.4517C22.9446 27.9294 22.3704 28.1682 21.6997 28.1682H4.62652ZM18.2546 6.91818L19.9924 8.6255L11.9436 16.6743V18.4121H13.6509L21.7302 10.3328L23.468 12.0401L15.3887 20.1194C15.1651 20.343 14.906 20.5208 14.6113 20.6529C14.3166 20.7851 14.0066 20.8511 13.6814 20.8511H10.7241C10.3786 20.8511 10.0889 20.7342 9.85518 20.5005C9.62144 20.2668 9.50457 19.9771 9.50457 19.6316V16.6743C9.50457 16.3491 9.56555 16.0391 9.6875 15.7444C9.80945 15.4497 9.98222 15.1905 10.2058 14.967L18.2546 6.91818ZM23.468 12.0401L18.2546 6.91818L21.3034 3.8694C21.7912 3.3816 22.3755 3.1377 23.0564 3.1377C23.7373 3.1377 24.3115 3.3816 24.779 3.8694L26.4863 5.60721C26.9538 6.07469 27.1875 6.64379 27.1875 7.31452C27.1875 7.98526 26.9538 8.55436 26.4863 9.02184L23.468 12.0401Z",
    ],
  },
  arrowLeft: {
    viewBoxWidth: 32,
    viewBoxHeight: 33,
    path: [
      "M8.70752 15.6325H26.1981C26.9345 15.6325 27.5314 16.2295 27.5314 16.9659C27.5314 17.7023 26.9345 18.2992 26.1981 18.2992H8.70752L14.9169 24.5085C15.4375 25.0292 15.4375 25.8733 14.9168 26.3939C14.3962 26.9145 13.5521 26.9145 13.0315 26.3939L5.01773 18.3801C4.23668 17.599 4.23668 16.3327 5.01773 15.5517L13.0315 7.53788C13.5521 7.01726 14.3962 7.01726 14.9168 7.53788C15.4375 8.0585 15.4375 8.90259 14.9168 9.42322L8.70752 15.6325Z",
    ],
  },
  board: {
    viewBoxWidth: 30,
    viewBoxHeight: 26,
    path: [
      "M22.9546 2.73855L22.9546 23.1929C22.954 23.7955 22.7143 24.3732 22.2882 24.7993C21.8622 25.2253 21.2844 25.465 20.6819 25.4656L16.1365 25.4656C15.5339 25.465 14.9562 25.2253 14.5301 24.7993C14.104 24.3732 13.8644 23.7955 13.8638 23.1929L13.8638 2.73855C13.8644 2.13597 14.104 1.55825 14.5301 1.13217C14.9562 0.706083 15.5339 0.466443 16.1365 0.465841L20.6819 0.46584C21.2844 0.466443 21.8622 0.706082 22.2882 1.13217C22.7143 1.55825 22.954 2.13597 22.9546 2.73855ZM16.1365 23.1929L20.6819 23.1929L20.6819 2.73855L16.1365 2.73855L16.1365 23.1929ZM16.1365 2.73855L16.1365 23.1929C16.1359 23.7955 15.8962 24.3731 15.4701 24.7992C15.0441 25.2253 14.4663 25.4649 13.8638 25.4655L9.31835 25.4655C8.71578 25.4649 8.13806 25.2253 7.71197 24.7992C7.28589 24.3731 7.04625 23.7954 7.04565 23.1928L7.04565 2.73852C7.04625 2.13595 7.28589 1.55823 7.71197 1.13214C8.13806 0.706058 8.71578 0.466423 9.31835 0.46582L13.8638 0.46582C14.4663 0.466422 15.0441 0.706058 15.4701 1.13214C15.8962 1.55823 16.1359 2.13597 16.1365 2.73855ZM9.31835 23.1928L13.8638 23.1929L13.8638 2.73855L9.31835 2.73852L9.31835 23.1928ZM9.31835 2.73852L9.31835 23.1928C9.31775 23.7954 9.07811 24.3731 8.65203 24.7992C8.22594 25.2253 7.64822 25.4649 7.04565 25.4656L2.50024 25.4656C1.89767 25.4649 1.31995 25.2253 0.893863 24.7992C0.467779 24.3731 0.228141 23.7954 0.227539 23.1928L0.227538 2.73852C0.22814 2.13595 0.467778 1.55823 0.893862 1.13214C1.31995 0.706058 1.89767 0.466423 2.50024 0.46582L7.04565 0.46582C7.64822 0.466423 8.22594 0.706058 8.65203 1.13214C9.07811 1.55823 9.31775 2.13595 9.31835 2.73852ZM2.50024 23.1928L7.04565 23.1928L7.04565 2.73852L2.50024 2.73852L2.50024 23.1928Z",
      "M29.7727 2.7388L29.7727 23.1931C29.7721 23.7957 29.5324 24.3734 29.1064 24.7995C28.6803 25.2256 28.1026 25.4652 27.5 25.4658L22.9546 25.4658C22.352 25.4652 21.7743 25.2256 21.3482 24.7995C20.9221 24.3734 20.6825 23.7955 20.6819 23.1929L20.6819 2.73855C20.6825 2.13597 20.9221 1.5585 21.3482 1.13242C21.7743 0.706334 22.352 0.466697 22.9546 0.466094L27.5 0.466094C28.1026 0.466696 28.6803 0.706334 29.1064 1.13242C29.5324 1.5585 29.7721 2.13622 29.7727 2.7388ZM22.9546 23.1929L27.5 23.1931L27.5 2.7388L22.9546 2.73855L22.9546 23.1929Z",
    ],
  },
  calendar: {
    viewBoxWidth: 25,
    viewBoxHeight: 24,
    path: [
      "M15.3555 18C14.6555 18 14.0638 17.7583 13.5805 17.275C13.0971 16.7917 12.8555 16.2 12.8555 15.5C12.8555 14.8 13.0971 14.2083 13.5805 13.725C14.0638 13.2417 14.6555 13 15.3555 13C16.0555 13 16.6471 13.2417 17.1305 13.725C17.6138 14.2083 17.8555 14.8 17.8555 15.5C17.8555 16.2 17.6138 16.7917 17.1305 17.275C16.6471 17.7583 16.0555 18 15.3555 18ZM5.85547 22C5.30547 22 4.83464 21.8042 4.44297 21.4125C4.0513 21.0208 3.85547 20.55 3.85547 20V6C3.85547 5.45 4.0513 4.97917 4.44297 4.5875C4.83464 4.19583 5.30547 4 5.85547 4H6.85547V3C6.85547 2.71667 6.9513 2.47917 7.14297 2.2875C7.33464 2.09583 7.57214 2 7.85547 2C8.1388 2 8.3763 2.09583 8.56797 2.2875C8.75964 2.47917 8.85547 2.71667 8.85547 3V4H16.8555V3C16.8555 2.71667 16.9513 2.47917 17.143 2.2875C17.3346 2.09583 17.5721 2 17.8555 2C18.1388 2 18.3763 2.09583 18.568 2.2875C18.7596 2.47917 18.8555 2.71667 18.8555 3V4H19.8555C20.4055 4 20.8763 4.19583 21.268 4.5875C21.6596 4.97917 21.8555 5.45 21.8555 6V20C21.8555 20.55 21.6596 21.0208 21.268 21.4125C20.8763 21.8042 20.4055 22 19.8555 22H5.85547ZM5.85547 20H19.8555V10H5.85547V20ZM5.85547 8H19.8555V6H5.85547V8Z",
    ],
  },
  check: {
    viewBoxWidth: 25,
    viewBoxHeight: 24,
    path: [
      "M9.61905 15.15L18.0941 6.675C18.2941 6.475 18.5316 6.375 18.8066 6.375C19.0816 6.375 19.3191 6.475 19.5191 6.675C19.7191 6.875 19.8191 7.1125 19.8191 7.3875C19.8191 7.6625 19.7191 7.9 19.5191 8.1L10.3191 17.3C10.1191 17.5 9.88572 17.6 9.61905 17.6C9.35239 17.6 9.11905 17.5 8.91905 17.3L4.61905 13C4.41905 12.8 4.32322 12.5625 4.33155 12.2875C4.33989 12.0125 4.44405 11.775 4.64405 11.575C4.84405 11.375 5.08155 11.275 5.35655 11.275C5.63155 11.275 5.86905 11.375 6.06905 11.575L9.61905 15.15Z",
    ],
  },
  checkboxChecked: {
    viewBoxWidth: 18,
    viewBoxHeight: 19,
    path: [
      "M17 8.96582V14.9658C17 16.6227 15.6569 17.9658 14 17.9658H4C2.34315 17.9658 1 16.6227 1 14.9658V4.96582C1 3.30897 2.34315 1.96582 4 1.96582H12",
      "M5 9.96582L9 13.9658L17 2.46582",
    ],
    noFill: true,
  },
  checkboxUnchecked: {
    viewBoxWidth: 18,
    viewBoxHeight: 19,
    path: [
      "m 17 5 V 14.9658 C 17 16.6227 15.6569 17.9658 14 17.9658 H 4 C 2.3432 17.9658 1 16.6227 1 14.9658 V 4.9658 c 0 -1.6568 1.3432 -3 3 -3 H 14 c 1.702 0.0282 3.013 1.2652 3 3.0342",
    ],
    noFill: true,
  },
  contacts: {
    viewBoxWidth: 30,
    viewBoxHeight: 31,
    path: [
      "M15 23.4658C13.8333 23.4658 12.7188 23.6481 11.6563 24.0127C10.5938 24.3773 9.625 24.9242 8.75 25.6533V25.9658H21.25V25.6533C20.375 24.9242 19.4062 24.3773 18.3438 24.0127C17.2812 23.6481 16.1667 23.4658 15 23.4658ZM6.25 24.5283C7.375 23.4242 8.68229 22.5544 10.1719 21.9189C11.6615 21.2835 13.2708 20.9658 15 20.9658C16.7292 20.9658 18.3385 21.2835 19.8281 21.9189C21.3177 22.5544 22.625 23.4242 23.75 24.5283V8.46582H6.25V24.5283ZM15 18.4658C13.7917 18.4658 12.7604 18.0387 11.9062 17.1846C11.0521 16.3304 10.625 15.2992 10.625 14.0908C10.625 12.8825 11.0521 11.8512 11.9062 10.9971C12.7604 10.1429 13.7917 9.71582 15 9.71582C16.2083 9.71582 17.2396 10.1429 18.0938 10.9971C18.9479 11.8512 19.375 12.8825 19.375 14.0908C19.375 15.2992 18.9479 16.3304 18.0938 17.1846C17.2396 18.0387 16.2083 18.4658 15 18.4658ZM15 15.9658C15.5208 15.9658 15.9635 15.7835 16.3281 15.4189C16.6927 15.0544 16.875 14.6117 16.875 14.0908C16.875 13.57 16.6927 13.1273 16.3281 12.7627C15.9635 12.3981 15.5208 12.2158 15 12.2158C14.4792 12.2158 14.0365 12.3981 13.6719 12.7627C13.3073 13.1273 13.125 13.57 13.125 14.0908C13.125 14.6117 13.3073 15.0544 13.6719 15.4189C14.0365 15.7835 14.4792 15.9658 15 15.9658ZM6.25 28.4658C5.5625 28.4658 4.97396 28.221 4.48438 27.7314C3.99479 27.2419 3.75 26.6533 3.75 25.9658V8.46582C3.75 7.77832 3.99479 7.18978 4.48438 6.7002C4.97396 6.21061 5.5625 5.96582 6.25 5.96582H7.5V3.46582H10V5.96582H20V3.46582H22.5V5.96582H23.75C24.4375 5.96582 25.026 6.21061 25.5156 6.7002C26.0052 7.18978 26.25 7.77832 26.25 8.46582V25.9658C26.25 26.6533 26.0052 27.2419 25.5156 27.7314C25.026 28.221 24.4375 28.4658 23.75 28.4658H6.25Z",
    ],
  },
  darkMode: {
    minY: -960,
    viewBoxWidth: 960,
    viewBoxHeight: 960,
    path: [
      "M482.872-197.5q-117.705 0-200.039-82.422Q200.5-362.343 200.5-480.088q0-102.412 63.951-179.412t160.31-98.5H419q-11.5 28-17.25 55.25T396-648.188q0 107.396 73.958 181.292Q543.917-393 651-393q26.377 0 53.856-5.794Q732.335-404.589 760-416V-421.761q-20.5 96.359-97.628 160.31-77.127 63.951-179.5 63.951Z",
    ],
  },
  eye: {
    viewBoxWidth: 25,
    viewBoxHeight: 25,
    path: [
      "M12.1443 16.8083C13.3943 16.8083 14.4568 16.3708 15.3318 15.4958C16.2068 14.6208 16.6443 13.5583 16.6443 12.3083C16.6443 11.0583 16.2068 9.99585 15.3318 9.12085C14.4568 8.24585 13.3943 7.80835 12.1443 7.80835C10.8943 7.80835 9.83184 8.24585 8.95684 9.12085C8.08184 9.99585 7.64434 11.0583 7.64434 12.3083C7.64434 13.5583 8.08184 14.6208 8.95684 15.4958C9.83184 16.3708 10.8943 16.8083 12.1443 16.8083ZM12.1443 15.0083C11.3943 15.0083 10.7568 14.7458 10.2318 14.2208C9.70684 13.6959 9.44434 13.0583 9.44434 12.3083C9.44434 11.5583 9.70684 10.9208 10.2318 10.3958C10.7568 9.87085 11.3943 9.60835 12.1443 9.60835C12.8943 9.60835 13.5318 9.87085 14.0568 10.3958C14.5818 10.9208 14.8443 11.5583 14.8443 12.3083C14.8443 13.0583 14.5818 13.6959 14.0568 14.2208C13.5318 14.7458 12.8943 15.0083 12.1443 15.0083ZM12.1443 19.8083C9.82767 19.8083 7.711 19.1959 5.79434 17.9708C3.87767 16.7458 2.42767 15.0917 1.44434 13.0083C1.39434 12.925 1.361 12.8209 1.34434 12.6958C1.32767 12.5708 1.31934 12.4417 1.31934 12.3083C1.31934 12.175 1.32767 12.0458 1.34434 11.9208C1.361 11.7958 1.39434 11.6917 1.44434 11.6083C2.42767 9.52502 3.87767 7.87085 5.79434 6.64585C7.711 5.42085 9.82767 4.80835 12.1443 4.80835C14.461 4.80835 16.5777 5.42085 18.4943 6.64585C20.411 7.87085 21.861 9.52502 22.8443 11.6083C22.8943 11.6917 22.9277 11.7958 22.9443 11.9208C22.961 12.0458 22.9693 12.175 22.9693 12.3083C22.9693 12.4417 22.961 12.5708 22.9443 12.6958C22.9277 12.8209 22.8943 12.925 22.8443 13.0083C21.861 15.0917 20.411 16.7458 18.4943 17.9708C16.5777 19.1959 14.461 19.8083 12.1443 19.8083ZM12.1443 17.8083C14.0277 17.8083 15.7568 17.3125 17.3318 16.3208C18.9068 15.3292 20.111 13.9917 20.9443 12.3083C20.111 10.625 18.9068 9.28752 17.3318 8.29585C15.7568 7.30418 14.0277 6.80835 12.1443 6.80835C10.261 6.80835 8.53184 7.30418 6.95684 8.29585C5.38184 9.28752 4.17767 10.625 3.34434 12.3083C4.17767 13.9917 5.38184 15.3292 6.95684 16.3208C8.53184 17.3125 10.261 17.8083 12.1443 17.8083Z",
    ],
  },
  eyeOff: {
    viewBoxWidth: 25,
    viewBoxHeight: 25,
    path: [
      "M16.2443 14.1084L14.7943 12.6584C14.9443 11.8751 14.7193 11.1418 14.1193 10.4584C13.5193 9.77511 12.7443 9.50845 11.7943 9.65845L10.3443 8.20845C10.6277 8.07511 10.9152 7.97511 11.2068 7.90845C11.4985 7.84178 11.811 7.80845 12.1443 7.80845C13.3943 7.80845 14.4568 8.24595 15.3318 9.12095C16.2068 9.99595 16.6443 11.0584 16.6443 12.3084C16.6443 12.6418 16.611 12.9543 16.5443 13.2459C16.4777 13.5376 16.3777 13.8251 16.2443 14.1084ZM19.4443 17.2584L17.9943 15.8584C18.6277 15.3751 19.1902 14.8459 19.6818 14.2709C20.1735 13.6959 20.5943 13.0418 20.9443 12.3084C20.111 10.6251 18.9152 9.28761 17.3568 8.29595C15.7985 7.30428 14.061 6.80845 12.1443 6.80845C11.661 6.80845 11.186 6.84178 10.7193 6.90845C10.2527 6.97511 9.79434 7.07511 9.34434 7.20845L7.79434 5.65845C8.47767 5.37511 9.17767 5.16261 9.89434 5.02095C10.611 4.87928 11.361 4.80845 12.1443 4.80845C14.5277 4.80845 16.6693 5.43761 18.5693 6.69595C20.4693 7.95428 21.8943 9.59178 22.8443 11.6084C22.8943 11.6918 22.9277 11.7959 22.9443 11.9209C22.961 12.0459 22.9693 12.1751 22.9693 12.3084C22.9693 12.4418 22.9568 12.5709 22.9318 12.6959C22.9068 12.8209 22.8777 12.9251 22.8443 13.0084C22.461 13.8584 21.9818 14.6418 21.4068 15.3584C20.8318 16.0751 20.1777 16.7084 19.4443 17.2584ZM19.2443 22.7084L15.7443 19.2584C15.161 19.4418 14.5735 19.5793 13.9818 19.6709C13.3902 19.7626 12.7777 19.8084 12.1443 19.8084C9.761 19.8084 7.61934 19.1793 5.71934 17.9209C3.81934 16.6626 2.39434 15.0251 1.44434 13.0084C1.39434 12.9251 1.361 12.8209 1.34434 12.6959C1.32767 12.5709 1.31934 12.4418 1.31934 12.3084C1.31934 12.1751 1.32767 12.0501 1.34434 11.9334C1.361 11.8168 1.39434 11.7168 1.44434 11.6334C1.79434 10.8834 2.211 10.1918 2.69434 9.55845C3.17767 8.92511 3.711 8.34178 4.29434 7.80845L2.21934 5.70845C2.036 5.52511 1.94434 5.29595 1.94434 5.02095C1.94434 4.74595 2.04434 4.50845 2.24434 4.30845C2.42767 4.12511 2.661 4.03345 2.94434 4.03345C3.22767 4.03345 3.461 4.12511 3.64434 4.30845L20.6443 21.3084C20.8277 21.4918 20.9235 21.7209 20.9318 21.9959C20.9402 22.2709 20.8443 22.5084 20.6443 22.7084C20.461 22.8918 20.2277 22.9834 19.9443 22.9834C19.661 22.9834 19.4277 22.8918 19.2443 22.7084ZM5.69434 9.20845C5.211 9.64178 4.76934 10.1168 4.36934 10.6334C3.96934 11.1501 3.62767 11.7084 3.34434 12.3084C4.17767 13.9918 5.3735 15.3293 6.93184 16.3209C8.49017 17.3126 10.2277 17.8084 12.1443 17.8084C12.4777 17.8084 12.8027 17.7876 13.1193 17.7459C13.436 17.7043 13.761 17.6584 14.0943 17.6084L13.1943 16.6584C13.011 16.7084 12.836 16.7459 12.6693 16.7709C12.5027 16.7959 12.3277 16.8084 12.1443 16.8084C10.8943 16.8084 9.83184 16.3709 8.95684 15.4959C8.08184 14.6209 7.64434 13.5584 7.64434 12.3084C7.64434 12.1251 7.65684 11.9501 7.68184 11.7834C7.70684 11.6168 7.74434 11.4418 7.79434 11.2584L5.69434 9.20845Z",
    ],
  },
  help: {
    viewBoxWidth: 32,
    viewBoxHeight: 33,
    path: [
      "M15.95 22.9658C16.3 22.9658 16.5958 22.845 16.8375 22.6033C17.0792 22.3617 17.2 22.0658 17.2 21.7158C17.2 21.3658 17.0792 21.07 16.8375 20.8283C16.5958 20.5867 16.3 20.4658 15.95 20.4658C15.6 20.4658 15.3042 20.5867 15.0625 20.8283C14.8208 21.07 14.7 21.3658 14.7 21.7158C14.7 22.0658 14.8208 22.3617 15.0625 22.6033C15.3042 22.845 15.6 22.9658 15.95 22.9658ZM16 26.9658C14.6167 26.9658 13.3167 26.7033 12.1 26.1783C10.8833 25.6533 9.825 24.9408 8.925 24.0408C8.025 23.1408 7.3125 22.0825 6.7875 20.8658C6.2625 19.6492 6 18.3492 6 16.9658C6 15.5825 6.2625 14.2825 6.7875 13.0658C7.3125 11.8492 8.025 10.7908 8.925 9.89082C9.825 8.99082 10.8833 8.27832 12.1 7.75332C13.3167 7.22832 14.6167 6.96582 16 6.96582C17.3833 6.96582 18.6833 7.22832 19.9 7.75332C21.1167 8.27832 22.175 8.99082 23.075 9.89082C23.975 10.7908 24.6875 11.8492 25.2125 13.0658C25.7375 14.2825 26 15.5825 26 16.9658C26 18.3492 25.7375 19.6492 25.2125 20.8658C24.6875 22.0825 23.975 23.1408 23.075 24.0408C22.175 24.9408 21.1167 25.6533 19.9 26.1783C18.6833 26.7033 17.3833 26.9658 16 26.9658ZM16 24.9658C18.2333 24.9658 20.125 24.1908 21.675 22.6408C23.225 21.0908 24 19.1992 24 16.9658C24 14.7325 23.225 12.8408 21.675 11.2908C20.125 9.74082 18.2333 8.96582 16 8.96582C13.7667 8.96582 11.875 9.74082 10.325 11.2908C8.775 12.8408 8 14.7325 8 16.9658C8 19.1992 8.775 21.0908 10.325 22.6408C11.875 24.1908 13.7667 24.9658 16 24.9658ZM16.1 12.6658C16.5167 12.6658 16.8792 12.7992 17.1875 13.0658C17.4958 13.3325 17.65 13.6658 17.65 14.0658C17.65 14.4325 17.5375 14.7575 17.3125 15.0408C17.0875 15.3242 16.8333 15.5908 16.55 15.8408C16.1667 16.1742 15.8292 16.5408 15.5375 16.9408C15.2458 17.3408 15.1 17.7908 15.1 18.2908C15.1 18.5242 15.1875 18.72 15.3625 18.8783C15.5375 19.0367 15.7417 19.1158 15.975 19.1158C16.225 19.1158 16.4375 19.0325 16.6125 18.8658C16.7875 18.6992 16.9 18.4908 16.95 18.2408C17.0167 17.8908 17.1667 17.5783 17.4 17.3033C17.6333 17.0283 17.8833 16.7658 18.15 16.5158C18.5333 16.1492 18.8625 15.7492 19.1375 15.3158C19.4125 14.8825 19.55 14.3992 19.55 13.8658C19.55 13.0158 19.2042 12.32 18.5125 11.7783C17.8208 11.2367 17.0167 10.9658 16.1 10.9658C15.4667 10.9658 14.8625 11.0992 14.2875 11.3658C13.7125 11.6325 13.275 12.0408 12.975 12.5908C12.8583 12.7908 12.8208 13.0033 12.8625 13.2283C12.9042 13.4533 13.0167 13.6242 13.2 13.7408C13.4333 13.8742 13.675 13.9158 13.925 13.8658C14.175 13.8158 14.3833 13.6742 14.55 13.4408C14.7333 13.1908 14.9625 12.9992 15.2375 12.8658C15.5125 12.7325 15.8 12.6658 16.1 12.6658Z",
    ],
  },
  lightMode: {
    minY: -960,
    viewBoxWidth: 960,
    viewBoxHeight: 960,
    path: [
      "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z",
    ],
  },
  lock: {
    viewBoxWidth: 25,
    viewBoxHeight: 25,
    path: [
      "M6.14453 22.8083C5.59453 22.8083 5.1237 22.6125 4.73203 22.2208C4.34036 21.8292 4.14453 21.3583 4.14453 20.8083V10.8083C4.14453 10.2583 4.34036 9.78752 4.73203 9.39585C5.1237 9.00418 5.59453 8.80835 6.14453 8.80835H7.14453V6.80835C7.14453 5.42502 7.63203 4.24585 8.60703 3.27085C9.58203 2.29585 10.7612 1.80835 12.1445 1.80835C13.5279 1.80835 14.707 2.29585 15.682 3.27085C16.657 4.24585 17.1445 5.42502 17.1445 6.80835V8.80835H18.1445C18.6945 8.80835 19.1654 9.00418 19.557 9.39585C19.9487 9.78752 20.1445 10.2583 20.1445 10.8083V20.8083C20.1445 21.3583 19.9487 21.8292 19.557 22.2208C19.1654 22.6125 18.6945 22.8083 18.1445 22.8083H6.14453ZM6.14453 20.8083H18.1445V10.8083H6.14453V20.8083ZM12.1445 17.8083C12.6945 17.8083 13.1654 17.6125 13.557 17.2208C13.9487 16.8292 14.1445 16.3583 14.1445 15.8083C14.1445 15.2583 13.9487 14.7875 13.557 14.3959C13.1654 14.0042 12.6945 13.8083 12.1445 13.8083C11.5945 13.8083 11.1237 14.0042 10.732 14.3959C10.3404 14.7875 10.1445 15.2583 10.1445 15.8083C10.1445 16.3583 10.3404 16.8292 10.732 17.2208C11.1237 17.6125 11.5945 17.8083 12.1445 17.8083ZM9.14453 8.80835H15.1445V6.80835C15.1445 5.97502 14.8529 5.26668 14.2695 4.68335C13.6862 4.10002 12.9779 3.80835 12.1445 3.80835C11.3112 3.80835 10.6029 4.10002 10.0195 4.68335C9.4362 5.26668 9.14453 5.97502 9.14453 6.80835V8.80835Z",
    ],
  },
  low: {
    viewBoxWidth: 21,
    viewBoxHeight: 16,
    path: [
      "M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z",
      "M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z",
    ],
  },
  mail: {
    viewBoxWidth: 25,
    viewBoxHeight: 25,
    path: [
      "M4.14453 20.8083C3.59453 20.8083 3.1237 20.6125 2.73203 20.2208C2.34036 19.8292 2.14453 19.3583 2.14453 18.8083V6.80835C2.14453 6.25835 2.34036 5.78752 2.73203 5.39585C3.1237 5.00418 3.59453 4.80835 4.14453 4.80835H20.1445C20.6945 4.80835 21.1654 5.00418 21.557 5.39585C21.9487 5.78752 22.1445 6.25835 22.1445 6.80835V18.8083C22.1445 19.3583 21.9487 19.8292 21.557 20.2208C21.1654 20.6125 20.6945 20.8083 20.1445 20.8083H4.14453ZM20.1445 8.80835L12.6695 13.4833C12.5862 13.5333 12.4987 13.5709 12.407 13.5958C12.3154 13.6208 12.2279 13.6333 12.1445 13.6333C12.0612 13.6333 11.9737 13.6208 11.882 13.5958C11.7904 13.5709 11.7029 13.5333 11.6195 13.4833L4.14453 8.80835V18.8083H20.1445V8.80835ZM12.1445 11.8083L20.1445 6.80835H4.14453L12.1445 11.8083ZM4.14453 9.05835V7.58335V7.60835V7.59585V9.05835Z",
    ],
  },
  medium: {
    viewBoxWidth: 21,
    viewBoxHeight: 8,
    path: [
      "M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z",
      "M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z",
    ],
  },
  pencil: {
    viewBoxWidth: 25,
    viewBoxHeight: 24,
    path: [
      "M5.14453 19H6.54453L15.1695 10.375L13.7695 8.975L5.14453 17.6V19ZM19.4445 8.925L15.1945 4.725L16.5945 3.325C16.9779 2.94167 17.4487 2.75 18.007 2.75C18.5654 2.75 19.0362 2.94167 19.4195 3.325L20.8195 4.725C21.2029 5.10833 21.4029 5.57083 21.4195 6.1125C21.4362 6.65417 21.2529 7.11667 20.8695 7.5L19.4445 8.925ZM17.9945 10.4L7.39453 21H3.14453V16.75L13.7445 6.15L17.9945 10.4Z",
    ],
  },
  person: {
    viewBoxWidth: 25,
    viewBoxHeight: 25,
    path: [
      "M12.1445 12.8083C11.0445 12.8083 10.1029 12.4167 9.31953 11.6333C8.5362 10.85 8.14453 9.90835 8.14453 8.80835C8.14453 7.70835 8.5362 6.76668 9.31953 5.98335C10.1029 5.20002 11.0445 4.80835 12.1445 4.80835C13.2445 4.80835 14.1862 5.20002 14.9695 5.98335C15.7529 6.76668 16.1445 7.70835 16.1445 8.80835C16.1445 9.90835 15.7529 10.85 14.9695 11.6333C14.1862 12.4167 13.2445 12.8083 12.1445 12.8083ZM18.1445 20.8083H6.14453C5.59453 20.8083 5.1237 20.6125 4.73203 20.2208C4.34036 19.8292 4.14453 19.3583 4.14453 18.8083V18.0083C4.14453 17.4417 4.29036 16.9208 4.58203 16.4458C4.8737 15.9708 5.2612 15.6083 5.74453 15.3583C6.77786 14.8417 7.82786 14.4542 8.89453 14.1958C9.9612 13.9375 11.0445 13.8083 12.1445 13.8083C13.2445 13.8083 14.3279 13.9375 15.3945 14.1958C16.4612 14.4542 17.5112 14.8417 18.5445 15.3583C19.0279 15.6083 19.4154 15.9708 19.707 16.4458C19.9987 16.9208 20.1445 17.4417 20.1445 18.0083V18.8083C20.1445 19.3583 19.9487 19.8292 19.557 20.2208C19.1654 20.6125 18.6945 20.8083 18.1445 20.8083ZM6.14453 18.8083H18.1445V18.0083C18.1445 17.825 18.0987 17.6583 18.007 17.5083C17.9154 17.3583 17.7945 17.2417 17.6445 17.1583C16.7445 16.7084 15.8362 16.3709 14.9195 16.1459C14.0029 15.9208 13.0779 15.8083 12.1445 15.8083C11.2112 15.8083 10.2862 15.9208 9.36953 16.1459C8.45286 16.3709 7.54453 16.7084 6.64453 17.1583C6.49453 17.2417 6.3737 17.3583 6.28203 17.5083C6.19036 17.6583 6.14453 17.825 6.14453 18.0083V18.8083ZM12.1445 10.8083C12.6945 10.8083 13.1654 10.6125 13.557 10.2208C13.9487 9.82918 14.1445 9.35835 14.1445 8.80835C14.1445 8.25835 13.9487 7.78752 13.557 7.39585C13.1654 7.00418 12.6945 6.80835 12.1445 6.80835C11.5945 6.80835 11.1237 7.00418 10.732 7.39585C10.3404 7.78752 10.1445 8.25835 10.1445 8.80835C10.1445 9.35835 10.3404 9.82918 10.732 10.2208C11.1237 10.6125 11.5945 10.8083 12.1445 10.8083Z",
    ],
  },
  plus: {
    viewBoxWidth: 33,
    viewBoxHeight: 32,
    path: [
      "M14.7344 17.3327H6.73438V14.666H14.7344V6.66602H17.401V14.666H25.401V17.3327H17.401V25.3327H14.7344V17.3327Z",
    ],
  },
  search: {
    viewBoxWidth: 18,
    viewBoxHeight: 18,
    path: [
      "M6.71181 13.2137C4.89463 13.2137 3.35669 12.5843 2.098 11.3256C0.839307 10.0669 0.209961 8.52899 0.209961 6.71181C0.209961 4.89463 0.839307 3.35669 2.098 2.098C3.35669 0.839307 4.89463 0.209961 6.71181 0.209961C8.52899 0.209961 10.0669 0.839307 11.3256 2.098C12.5843 3.35669 13.2137 4.89463 13.2137 6.71181C13.2137 7.44535 13.097 8.13721 12.8636 8.7874C12.6302 9.43758 12.3134 10.0127 11.9133 10.5129L17.5149 16.1145C17.6983 16.2979 17.79 16.5313 17.79 16.8147C17.79 17.0981 17.6983 17.3315 17.5149 17.5149C17.3315 17.6983 17.0981 17.79 16.8147 17.79C16.5313 17.79 16.2979 17.6983 16.1145 17.5149L10.5129 11.9133C10.0127 12.3134 9.43758 12.6302 8.7874 12.8636C8.13721 13.097 7.44535 13.2137 6.71181 13.2137ZM6.71181 11.2131C7.96217 11.2131 9.02497 10.7755 9.90022 9.90022C10.7755 9.02497 11.2131 7.96217 11.2131 6.71181C11.2131 5.46145 10.7755 4.39865 9.90022 3.5234C9.02497 2.64815 7.96217 2.21053 6.71181 2.21053C5.46145 2.21053 4.39865 2.64815 3.5234 3.5234C2.64815 4.39865 2.21053 5.46145 2.21053 6.71181C2.21053 7.96217 2.64815 9.02497 3.5234 9.90022C4.39865 10.7755 5.46145 11.2131 6.71181 11.2131Z",
    ],
  },
  summary: {
    viewBoxWidth: 30,
    viewBoxHeight: 31,
    path: [
      "M25.2273 3.46582H4.77273H4.5C3.39543 3.46582 2.5 4.36155 2.5 5.46612C2.5 5.64591 2.5 5.77328 2.5 5.80579V26.2603V26.4658C2.5 27.5704 3.39572 28.4658 4.50029 28.4658C4.64377 28.4658 4.74401 28.4658 4.77272 28.4658H25.2273C25.256 28.4658 25.3562 28.4658 25.4997 28.4658C26.6043 28.4658 27.5 27.5699 27.5 26.4653C27.5 26.3585 27.5 26.2846 27.5 26.2603V5.80576C27.5 5.77326 27.5 5.6459 27.5 5.46612C27.5 4.36155 26.6043 3.46582 25.4997 3.46582C25.3562 3.46582 25.256 3.46582 25.2273 3.46582ZM17.2727 26.2603H4.77273V17.1694H17.2727V26.2603ZM17.2727 14.8967H4.77273V5.80579L17.2727 5.80576V14.8967ZM25.2273 26.2603H19.5455V5.80579H25.2273V26.2603Z",
    ],
  },
  urgent: {
    viewBoxWidth: 21,
    viewBoxHeight: 16,
    path: [
      "M19.2597 15.4464C19.0251 15.4468 18.7965 15.3719 18.6077 15.2328L10.3556 9.14965L2.10356 15.2328C1.98771 15.3184 1.85613 15.3803 1.71633 15.4151C1.57652 15.4498 1.43124 15.4567 1.28877 15.4354C1.14631 15.414 1.00944 15.3648 0.885997 15.2906C0.762552 15.2164 0.654943 15.1186 0.569314 15.0029C0.483684 14.8871 0.421712 14.7556 0.386936 14.6159C0.352159 14.4762 0.345259 14.331 0.366629 14.1887C0.409788 13.9012 0.565479 13.6425 0.799451 13.4697L9.70356 6.89926C9.89226 6.75967 10.1208 6.68433 10.3556 6.68433C10.5904 6.68433 10.819 6.75967 11.0077 6.89926L19.9118 13.4697C20.0977 13.6067 20.2356 13.7988 20.3057 14.0186C20.3759 14.2385 20.3747 14.4749 20.3024 14.6941C20.2301 14.9133 20.0904 15.1041 19.9031 15.2391C19.7159 15.3742 19.4907 15.4468 19.2597 15.4464Z",
      "M19.2597 9.69733C19.0251 9.69774 18.7965 9.62289 18.6077 9.48379L10.3556 3.40063L2.10356 9.48379C1.86959 9.6566 1.57651 9.72945 1.28878 9.68633C1.00105 9.6432 0.742254 9.48762 0.569318 9.25383C0.396382 9.02003 0.323475 8.72716 0.366634 8.43964C0.409793 8.15213 0.565483 7.89352 0.799455 7.72072L9.70356 1.15024C9.89226 1.01065 10.1208 0.935303 10.3556 0.935303C10.5904 0.935303 10.819 1.01065 11.0077 1.15024L19.9118 7.72072C20.0977 7.85763 20.2356 8.04974 20.3057 8.26962C20.3759 8.4895 20.3747 8.72591 20.3024 8.94509C20.2301 9.16427 20.0904 9.35503 19.9031 9.49012C19.7159 9.62521 19.4907 9.69773 19.2597 9.69733Z",
    ],
  },
  trash: {
    viewBoxWidth: 25,
    viewBoxHeight: 24,
    path: [
      "M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z",
    ],
  },
  x: {
    viewBoxWidth: 24,
    viewBoxHeight: 25,
    path: [
      "M11.9998 14.3659L7.0998 19.2659C6.91647 19.4492 6.68314 19.5409 6.3998 19.5409C6.11647 19.5409 5.88314 19.4492 5.6998 19.2659C5.51647 19.0825 5.4248 18.8492 5.4248 18.5659C5.4248 18.2825 5.51647 18.0492 5.6998 17.8659L10.5998 12.9659L5.6998 8.06587C5.51647 7.88254 5.4248 7.6492 5.4248 7.36587C5.4248 7.08254 5.51647 6.8492 5.6998 6.66587C5.88314 6.48254 6.11647 6.39087 6.3998 6.39087C6.68314 6.39087 6.91647 6.48254 7.0998 6.66587L11.9998 11.5659L16.8998 6.66587C17.0831 6.48254 17.3165 6.39087 17.5998 6.39087C17.8831 6.39087 18.1165 6.48254 18.2998 6.66587C18.4831 6.8492 18.5748 7.08254 18.5748 7.36587C18.5748 7.6492 18.4831 7.88254 18.2998 8.06587L13.3998 12.9659L18.2998 17.8659C18.4831 18.0492 18.5748 18.2825 18.5748 18.5659C18.5748 18.8492 18.4831 19.0825 18.2998 19.2659C18.1165 19.4492 17.8831 19.5409 17.5998 19.5409C17.3165 19.5409 17.0831 19.4492 16.8998 19.2659L11.9998 14.3659Z",
    ],
  },
};
