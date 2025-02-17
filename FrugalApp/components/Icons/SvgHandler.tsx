import Svg, { Path } from "react-native-svg";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import {Mask, Defs, Rect, LinearGradient, Stop, G} from 'react-native-svg';
// TODO: find easier way for SVGs and SVG urls

// 1.
// SVG to JSX using https://www.svgviewer.dev/svg-to-react-native-jsx

// 2.
// change to tsx
// {width = 46, height = 41, fill = 'none', ...props}: SvgProps
// width={width}
// height={height}
// fill={fill}
// xmlns="http://www.w3.org/2000/svg" // remove

// 3.
// export the component

type SvgProps = {
  width?: number;
  height?: number;
  fill?: string;
} & ViewProps;

// Store missing Icon SVG

const NoIcon = ({
  width = 46,
  height = 41,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 46 41"
    fill={fill}
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.46181 0.378601C6.10905 0.378601 4.20176 2.28125 4.20176 4.62828V8.53314L0.985547 18.1582C0.155817 20.6415 1.74669 23.1979 4.20176 23.6732V36.5009C4.20176 38.848 6.10905 40.7506 8.46181 40.7506H16.9819H19.1119H27.632H29.7621H38.2822C40.635 40.7506 42.5422 38.848 42.5422 36.5009V23.6732C44.9973 23.1979 46.5882 20.6415 45.7583 18.1582L42.5422 8.53314V4.62828C42.5422 2.28125 40.635 0.378601 38.2822 0.378601H8.46181ZM29.7621 36.5009H38.2822V23.7518H35.0871H23.372H11.6568H8.46181V36.5009H16.9819V30.1264C16.9819 26.6057 19.8427 23.7518 23.372 23.7518C26.9012 23.7518 29.7621 26.6057 29.7621 30.1264V36.5009ZM21.242 36.5009H25.502V30.1264C25.502 28.9528 24.5484 28.0015 23.372 28.0015C22.1956 28.0015 21.242 28.9528 21.242 30.1264V36.5009ZM5.02699 19.5022L7.86702 11.0028H11.2725L9.85244 19.5022H6.33178H5.02699ZM14.1713 19.5022L15.5913 11.0028H21.242V19.5022H14.1713ZM25.502 19.5022V11.0028H31.1527L32.5726 19.5022H25.502ZM36.8915 19.5022L35.4716 11.0028H38.8769L41.717 19.5022H40.4122H36.8915ZM38.2822 4.62828V6.75312H32.9571H23.372H13.7869H8.46181V4.62828H38.2822Z"
      fill="black"
    />
  </Svg>
);

// Walmart Icon SVG

const WalmartIcon = ({
  width = 46,
  height = 41,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 46 48"
    fill={fill}
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21.3434 15.9969C22.4465 15.9969 23.3545 15.4234 23.4771 14.6824L24.5662 2.36559C24.5662 1.1482 23.1401 0.148788 21.3469 0.148788C19.5555 0.148788 18.1307 1.14819 18.1307 2.36581L19.2191 14.6824C19.3389 15.4231 20.2469 15.9969 21.3471 15.9969H21.3434ZM14.6866 19.844C15.2399 18.8899 15.1982 17.8175 14.615 17.3411L4.49127 10.2395C3.43869 9.62997 1.86047 10.3637 0.96478 11.9171C0.0660175 13.4685 0.225331 15.2012 1.27506 15.811L12.485 21.0304C13.1858 21.2902 14.1412 20.7902 14.6901 19.8367L14.6866 19.844ZM28.0061 19.8374C28.5586 20.7909 29.5092 21.291 30.2106 21.0311L41.4205 15.8117C42.4769 15.2021 42.6269 13.4692 41.7365 11.9177C40.8365 10.3659 39.2554 9.63063 38.2056 10.2402L28.0813 17.3417C27.5025 17.8175 27.4594 18.8907 28.0096 19.8447L28.0061 19.8374ZM21.3434 31.3824C22.4465 31.3824 23.3545 31.9511 23.4771 32.6928L24.5662 45.0078C24.5662 46.229 23.1401 47.2262 21.3469 47.2262C19.5555 47.2262 18.1307 46.229 18.1307 45.0078L19.2191 32.6928C19.3389 31.9511 20.2469 31.3824 21.3471 31.3824H21.3434ZM28.0061 27.5345C28.5586 26.5783 29.5092 26.0826 30.2106 26.3454L41.4205 31.5613C42.4769 32.1716 42.6269 33.906 41.7365 35.4587C40.8365 37.0055 39.2554 37.7428 38.2056 37.1341L28.0813 30.0391C27.5025 29.5597 27.4594 28.4857 28.0096 27.5325H28.0052M14.6866 27.5332C15.2399 28.4858 15.1982 29.5597 14.615 30.04L4.49127 37.1348C3.43869 37.7434 1.86047 37.0062 0.96478 35.4594C0.0660175 33.9067 0.225331 32.1722 1.27506 31.562L12.485 26.3461C13.1858 26.0833 14.1412 26.579 14.6901 27.5353H14.6866"
      fill="#FDBB30"
    />
    <Path
      d="M44.2321 36.3495H44.3162C44.4279 36.3495 44.4995 36.3033 44.4995 36.2348C44.4995 36.1568 44.4323 36.1143 44.3285 36.1143C44.2929 36.1143 44.2565 36.1216 44.2323 36.1216V36.3514V36.3492L44.2321 36.3495ZM44.2191 36.9028H43.9227V35.937C43.9899 35.9238 44.1468 35.9003 44.3477 35.9003C44.5659 35.9003 44.6636 35.9311 44.7353 35.9794C44.7957 36.0216 44.8397 36.0937 44.8397 36.191C44.8397 36.2901 44.7485 36.3741 44.614 36.4108V36.4231C44.7236 36.4523 44.7834 36.5319 44.8148 36.6714C44.8447 36.8107 44.8632 36.8676 44.8819 36.9035H44.5461C44.5169 36.8676 44.4995 36.7821 44.4797 36.6969C44.4608 36.5991 44.4147 36.5501 44.3156 36.5501H44.2184L44.2191 36.9028ZM44.3417 35.6223C43.9161 35.6223 43.595 35.9691 43.595 36.4112C43.595 36.8419 43.917 37.1933 44.3534 37.1933C44.7915 37.2005 45.1135 36.8421 45.1135 36.4042C45.1135 35.9682 44.7915 35.6223 44.3483 35.6223H44.3417ZM44.3608 35.3602C44.9542 35.3602 45.4273 35.8273 45.4273 36.404C45.4273 36.9874 44.9542 37.4552 44.3527 37.4552C43.7513 37.4552 43.2722 36.9867 43.2722 36.4042C43.2722 35.8274 43.7519 35.3604 44.3527 35.3604H44.3593"
      fill="#FDBB30"
    />
  </Svg>
);

// SafeWay Icon SVG

const SafeWayIcon = ({
  width = 46,
  height = 41,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 46 38"
    fill={fill}
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.7824 1.08716C30.5591 0.960628 27.6208 0.801405 25.8077 0.764191H24.6197C22.9504 0.817885 19.9887 0.817885 16.4345 2.91836C11.9648 5.82611 11.6956 11.0496 11.6956 11.6958C11.6956 13.4191 11.8032 15.8962 16.0573 20.1503C19.9348 24.082 19.073 23.2202 20.0961 24.4584C22.0889 26.7745 22.5195 28.1205 22.5195 29.7904C22.5195 34.9057 17.2423 37.9217 12.6647 36.8988V37.3292C17.2957 37.9756 22.9504 37.9217 25.2662 37.2752C31.082 35.8749 34.2593 31.5134 34.2593 26.074C34.2593 20.4199 30.0052 16.7577 28.8199 15.5733C26.5583 13.3115 25.6966 12.5036 24.9427 11.5882C23.9735 10.4034 23.2197 8.73412 23.2197 7.22615C23.2197 4.53345 25.4818 1.0332 31.8358 1.46382L31.7824 1.08716Z"
      fill="#CD5241"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27.7976 37.5987C32.1056 37.3292 35.4446 37.1679 38.3523 33.5063C39.914 31.5137 40.9374 27.2591 40.9374 17.5122C40.9374 12.7732 40.2909 9.32666 40.1835 8.94974C40.0756 8.62677 39.537 6.79584 38.6218 5.39553C37.7601 4.15683 37.0062 3.24136 35.1216 2.43355C33.1825 1.62574 32.7521 1.67997 32.6442 1.67997L32.5902 1.19539C35.3906 1.51835 37.9756 2.11085 39.1604 2.59543C41.2069 3.5109 42.3916 4.53402 43.3611 6.20361C45.0301 9.43459 45.0841 15.5736 45.0841 17.5122C45.0841 23.4359 44.9227 31.6751 41.5299 34.4754C38.137 37.2752 33.452 37.7061 27.7979 37.7061L27.7976 37.5987ZM17.8888 0.817928C15.2501 0.979544 10.5111 1.19512 7.44148 5.17995C5.93351 7.1725 4.91039 11.3192 4.91039 21.0661C4.91039 25.8051 5.61054 29.2514 5.71846 29.6283C5.82612 29.9518 6.3107 31.8364 7.22617 33.1825C8.14163 34.4752 8.84179 35.4446 10.7264 36.1984C11.1806 36.3638 11.6295 36.5433 12.0725 36.7367V37.2215C9.75726 36.8986 7.71048 36.3598 6.74132 35.9828C4.64112 35.0676 3.51034 33.8829 2.54091 32.267C0.817633 28.9824 0.763672 23.0044 0.763672 21.0658C0.763672 15.0342 0.925287 7.11827 4.21023 4.1563C7.11798 1.57151 12.7727 0.763702 17.8885 0.763702L17.8888 0.817928Z"
      fill="#CD5241"
    />
  </Svg>
);

const TraderJoesIcon = ({
  width = 46,
  height = 41,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 67 7"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.63791 0.565288H5.17282L6.23323 3.21282C5.77359 2.91639 5.29061 2.36565 5.05469 2.15393C4.80762 1.93157 4.46577 2.04792 4.46577 2.04792C3.64093 2.4715 4.23003 4.37772 5.05469 6.49565H1.63791C2.58053 4.58943 2.81627 3.00095 2.69831 2.5772C2.69831 2.5772 2.59499 2.13467 2.34496 2.04792C2.12647 1.97197 1.75604 2.15393 1.75604 2.15393C1.28455 2.4715 1.04864 2.78908 0.459717 3.21282L1.63791 0.565288ZM57.2543 6.49565H52.6586C52.6586 6.33686 53.3659 5.09774 53.3659 3.74211C53.3659 2.29142 52.6586 0.713583 52.6586 0.565288H57.2543L57.7256 2.4715C57.2897 2.46086 55.2039 1.35969 54.78 1.73019C54.002 2.39759 54.1318 3.20217 55.9582 2.78908V3.95398C55.8404 3.95398 54.697 3.55153 54.5442 3.84828C54.3909 4.1552 54.2381 5.42611 55.0154 5.33075C55.8404 5.22489 57.1484 4.39886 57.7256 4.37756L57.2543 6.49565ZM29.9174 6.49565H25.3219C25.3219 6.33686 26.029 5.09774 26.029 3.74211C26.029 2.29142 25.3219 0.713583 25.3219 0.565288H29.9174L30.3889 2.4715C29.953 2.46086 27.8674 1.35969 27.4429 1.73019C26.6656 2.39759 26.7951 3.20217 28.6213 2.78908V3.95398C28.5033 3.95398 27.3605 3.55153 27.2075 3.84828C27.0542 4.1552 26.9009 5.42611 27.6785 5.33075C28.5033 5.22489 29.8117 4.39886 30.3889 4.37756L29.9174 6.49565ZM42.4078 0.565288H46.6496C46.6496 0.649849 45.0001 1.2009 45.1177 3.74211C45.1767 5.20375 44.6817 5.8389 43.5861 6.38995C43.0437 6.65459 42.2546 6.63361 41.7007 6.28378C41.3827 6.08256 41.1348 5.73319 40.8759 5.33075C40.5222 4.80146 39.5796 4.58943 39.5796 4.58943C39.9331 4.46259 42.0541 3.42453 42.4078 3.31852C40.9935 4.48373 42.9141 5.08709 43.3502 4.58943C44.764 3.00095 43.1145 0.989031 42.4076 0.565288M65.3734 0.674904C65.609 0.886775 66.434 0.484329 66.6697 0.569203L65.3734 2.79252C65.4089 2.37958 65.1378 1.94566 65.0202 1.8398C64.9493 1.77623 64.7845 1.52192 64.195 1.52192C63.7476 1.52192 63.3939 1.59614 63.2526 1.8398C63.0174 2.26323 63.2526 2.8561 64.0778 3.00439C64.6667 3.11025 65.609 3.74571 65.609 4.80444C65.609 6.21268 64.7845 6.49847 63.4883 6.49847C62.0746 6.49847 62.3105 6.39277 61.4855 6.28707C61.2503 6.39277 60.7788 6.62547 60.4253 6.49847L61.3679 4.06328C61.5209 4.07393 61.6507 5.33388 62.4279 5.33388C62.7816 5.33388 63.3939 4.90012 63.0174 4.48687C62.4279 3.85141 62.3105 4.16898 61.6034 3.53384C61.3909 3.34326 61.1325 3.00455 61.0966 2.27373C61.0734 1.69167 61.5322 1.07735 62.0746 0.780605C63.2054 0.166757 65.2204 0.674904 65.3736 0.674904M59.365 2.79268L59.6006 1.94566C59.6006 1.94566 58.069 0.992633 59.1296 0.251318C59.3648 0.0925319 60.0721 0.0399165 60.543 0.56889C61.1793 1.28891 59.365 2.79268 59.365 2.79268ZM8.472 1.41262C8.472 1.41262 9.88593 1.30645 9.76832 2.36565C9.72093 2.81022 8.70774 3.21266 8.472 3.21266C8.472 3.21266 8.59013 2.77874 8.59013 2.36565C8.59013 1.99499 8.472 1.41262 8.472 1.41262ZM6.2334 0.565288H10.7109C11.1821 0.671302 11.5123 1.34888 11.4182 1.94206C11.3119 2.66208 10.3576 3.31868 10.3576 3.31868C10.3809 3.46697 10.6756 4.39886 11.0643 5.01302C11.5354 5.75433 12.1012 6.19922 12.1249 6.49549H9.76815C9.76815 6.31541 10.1217 5.75433 9.65054 4.69545C9.46201 4.25072 9.06109 3.95429 9.06109 3.95429C8.82535 3.6364 8.47217 3.84812 8.47217 3.84812C8.00104 4.05999 8.35439 5.86035 8.94348 6.49549H6.2334C6.8225 5.96621 7.17603 3.84812 7.17603 3.84812C7.41159 1.3066 6.2334 0.861564 6.2334 0.565288ZM15.4242 2.04792C15.8957 3.63656 16.4848 3.74226 16.2491 3.74226H14.7172C14.7172 3.74226 15.0473 3.2421 15.1887 2.89509C15.3185 2.57501 15.4242 2.04792 15.4242 2.04792ZM18.9595 6.49565H16.72C16.72 6.40013 16.4261 5.21409 16.0133 4.69529C15.7541 4.36707 15.2711 4.44145 15.0707 4.48342C14.1281 4.69529 14.5759 6.15694 14.5992 6.49565H12.3606C12.3606 6.30508 13.4447 3.80584 13.8922 2.4715C14.3638 1.09489 14.1281 0.702934 14.1281 0.565445H16.8382C16.8852 0.681794 16.7087 1.51847 17.0739 2.4715C17.7337 4.21862 18.9595 6.49565 18.9595 6.49565ZM21.5514 1.62433C21.5514 1.62433 23.2719 2.09035 23.3191 3.21282C23.3659 4.42016 22.2585 4.69545 21.9048 4.80146C21.9048 4.80146 21.9048 5.22473 21.5514 3.84843C21.3275 2.96916 21.5514 1.62433 21.5514 1.62433ZM19.5482 6.46402C19.5482 6.46402 20.0668 5.44725 20.2553 3.92234C20.491 2.01613 19.4541 1.20075 19.4303 0.533656H22.73C23.7904 0.851229 24.9567 2.09035 24.9686 3.3929C24.9921 4.9709 23.9082 6.35785 22.612 6.46402C21.8107 6.52728 20.3025 6.46402 19.5482 6.46402ZM33.4525 1.41262C33.4525 1.41262 34.8663 1.30645 34.7483 2.36565C34.7014 2.81022 33.6879 3.21266 33.4525 3.21266C33.4525 3.21266 33.5705 2.77874 33.5705 2.36565C33.5705 1.99499 33.4525 1.41262 33.4525 1.41262ZM31.2136 0.565288H35.6915C36.1626 0.671302 36.4926 1.34888 36.3982 1.94206C36.2919 2.66208 35.3378 3.31868 35.3378 3.31868C35.3613 3.46697 35.6561 4.39886 36.0448 5.01302C36.5159 5.75433 37.0817 6.19922 37.1049 6.49549H34.7483C34.7483 6.31541 35.102 5.75433 34.6311 4.69545C34.4418 4.25072 34.0416 3.95429 34.0416 3.95429C33.8059 3.6364 33.4527 3.84812 33.4527 3.84812C32.9812 4.05999 33.3346 5.86035 33.924 6.49549H31.2136C31.8025 5.96621 32.1564 3.84812 32.1564 3.84812C32.3921 1.3066 31.2136 0.861564 31.2136 0.565288ZM47.5925 3.6364C47.5967 3.30184 47.7474 2.98224 48.0121 2.74698C48.2768 2.51171 48.6341 2.37975 49.0064 2.37975C49.3787 2.37975 49.7359 2.51171 50.0006 2.74698C50.2653 2.98224 50.4161 3.30184 50.4202 3.6364C50.4161 3.97097 50.2653 4.29056 50.0006 4.52583C49.7359 4.7611 49.3787 4.89306 49.0064 4.89306C48.6341 4.89306 48.2768 4.7611 48.0121 4.52583C47.7474 4.29056 47.5967 3.97097 47.5925 3.6364ZM46.532 3.58332C46.532 1.91669 47.798 0.565288 49.3596 0.565288C50.9215 0.565288 52.188 1.91669 52.188 3.58332C52.188 5.25026 50.9213 6.60166 49.3596 6.60166C47.798 6.60166 46.5318 5.25026 46.5318 3.58332"
      fill="#D21242"
    />
  </Svg>
);

const ArrowIcon = ({
  width = 11,
  height = 18,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 11 18"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.218991 8.42909L9.33522 0.220559C9.63437 -0.0735195 10.1195 -0.0735195 10.4187 0.220559C10.7178 0.514614 10.7178 0.991752 10.4187 1.28583L1.85211 8.99999L10.4179 16.7141C10.7171 17.0082 10.7171 17.4853 10.4179 17.7794C10.1188 18.0735 9.63361 18.0735 9.33449 17.7794L0.218232 9.57088C0.0587902 9.41411 -0.00956726 9.20628 0.00108242 9.00074C-0.00883102 8.79443 0.0595036 8.58663 0.218991 8.42909Z"
      fill="#868889"
    />
  </Svg>
);

const RemoveCartIcon = ({
  width = 18,
  height = 18,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 32 32"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M11.188 4.781c6.188 0 11.219 5.031 11.219 11.219s-5.031 11.188-11.219 11.188-11.188-5-11.188-11.188 5-11.219 11.188-11.219zM11.25 17.625l3.563 3.594c0.438 0.438 1.156 0.438 1.594 0 0.406-0.406 0.406-1.125 0-1.563l-3.563-3.594 3.563-3.594c0.406-0.438 0.406-1.156 0-1.563-0.438-0.438-1.156-0.438-1.594 0l-3.563 3.594-3.563-3.594c-0.438-0.438-1.156-0.438-1.594 0-0.406 0.406-0.406 1.125 0 1.563l3.563 3.594-3.563 3.594c-0.406 0.438-0.406 1.156 0 1.563 0.438 0.438 1.156 0.438 1.594 0z" />
  </Svg>
);

const AddToCartIcon = ({
  width = 100,
  height = 100,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 68 100"
    fill={fill}
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="path-1-outside-1_62_575"
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={68}
      height={100}
      fill="black"
    >
      <Rect fill="white" width={68} height={100} />
      <Path d="M2 0H68V100H2V0Z" />
    </Mask>
    <Path
      d="M4 100V0H0V100H4Z"
      fill="#BDBCBC"
      mask="url(#path-1-outside-1_62_575)"
    />
    <Rect
      x={2}
      width={66}
      height={100}
      rx={5}
      fill="url(#paint0_linear_62_575)"
    />
    <Path
      d="M48.9957 58.1528L47.7795 44.6123C47.7534 44.3117 47.4972 44.084 47.1975 44.084H44.6957C44.661 41.8252 42.7933 40 40.5 40C38.2067 40 36.339 41.8252 36.3043 44.084H33.8025C33.4985 44.084 33.2466 44.3117 33.2205 44.6123L32.0043 58.1528C32.0043 58.1699 32 58.1871 32 58.2043C32 59.746 33.429 61 35.188 61H45.812C47.571 61 49 59.746 49 58.2043C49 58.1871 49 58.1699 48.9957 58.1528ZM40.5 41.1595C42.1461 41.1595 43.4882 42.465 43.523 44.084H37.477C37.5118 42.465 38.8539 41.1595 40.5 41.1595ZM45.812 59.8405H35.188C34.0848 59.8405 33.1901 59.119 33.1727 58.2301L34.3367 45.2479H36.2999V47.0086C36.2999 47.3307 36.5606 47.5883 36.8863 47.5883C37.2121 47.5883 37.4727 47.3307 37.4727 47.0086V45.2479H43.523V47.0086C43.523 47.3307 43.7836 47.5883 44.1094 47.5883C44.4351 47.5883 44.6957 47.3307 44.6957 47.0086V45.2479H46.6589L47.8273 58.2301C47.8099 59.119 46.9108 59.8405 45.812 59.8405Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_62_575"
        x1={2}
        y1={0}
        x2={68.874}
        y2={1.23147}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset={1} stopColor="#6CC51D" />
      </LinearGradient>
    </Defs>
  </Svg>
);


const SecondaryButton = ({ width = 280, height = 44, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 280 44"
    fill="none"
    {...props}
  >
    <Defs>
      <LinearGradient
        id="paint0_linear_118_410"
        x1="0"
        y1="-2.93333"
        x2="279.899"
        y2="52.5743"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#B9B9B9" />
        <Stop offset="1" stopColor="#B9B9B9" />
      </LinearGradient>
    </Defs>
    <Path
      d="M0 5C0 2.23858 2.23858 0 5 0H275C277.761 0 280 2.23858 280 5V39C280 41.7614 277.761 44 275 44H5C2.23857 44 0 41.7614 0 39V5Z"
      fill="url(#paint0_linear_118_410)"
    />
  </Svg>
);

const PrimaryButton = ({width=398, height=79, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 398 79"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_d_116_406)">
      <Path
        d="M9 5C9 2.23858 11.2386 0 14 0H384C386.761 0 389 2.23858 389 5V55C389 57.7614 386.761 60 384 60H14C11.2386 60 9 57.7614 9 55V5Z"
        fill="url(#paint0_linear_116_406)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_116_406"
        x1={9}
        y1={-3.99999}
        x2={389}
        y2={71}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.0139783} stopColor="#AEDC81" />
        <Stop offset={1} stopColor="#6CC51D" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const GasIcon = ({width = 26, height = 26, fill = 'none', ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 26 26"
    fill={fill}
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18 24.9668V8.19268C18 4.8038 18 3.10936 16.9185 2.05657C15.837 1.00378 14.0965 1.00378 10.6154 1.00378H9.38462C5.90347 1.00378 4.1629 1.00378 3.08145 2.05657C2 3.10936 2 4.8038 2 8.19268V24.9668"
      stroke="#868889"
      strokeWidth={2}
    />
    <Path
      d="M11.7143 5.99622H8.28571C7.20822 5.99622 6.66947 5.99622 6.33473 6.36176C6 6.72732 6 7.31567 6 8.49236C6 9.66906 6 10.2574 6.33473 10.623C6.66947 10.9885 7.20822 10.9885 8.28571 10.9885H11.7143C12.7918 10.9885 13.3305 10.9885 13.6653 10.623C14 10.2574 14 9.66906 14 8.49236C14 7.31567 14 6.72732 13.6653 6.36176C13.3305 5.99622 12.7918 5.99622 11.7143 5.99622Z"
      stroke="#868889"
      strokeWidth={2}
    />
    <Path
      d="M7 18.9761H13"
      stroke="#868889"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M19 24.9669H1"
      stroke="#868889"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M22.0833 3.00073L23.522 4.23192C23.6827 4.36953 23.7631 4.43834 23.8363 4.50847C24.526 5.16997 24.9426 6.09703 24.9945 7.08647C25 7.19137 25 7.30152 25 7.5218V21.0978C25 22.1317 24.2165 22.9699 23.25 22.9699C22.2835 22.9699 21.5 22.1317 21.5 21.0978V21.0087C21.5 20.0239 20.7538 19.2257 19.8333 19.2257H18"
      stroke="#868889"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M25 7.99304H23.5C22.6716 7.99304 22 8.77533 22 9.74034V12.558C22 13.3101 22.4131 13.9778 23.0257 14.2156L25 14.9822"
      stroke="#868889"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const SearchIcon = ({
  width = 20,
  height = 20,
  fill = "none",
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.5056 17.3283L14.0682 12.8909C15.1699 11.53 15.8332 9.80088 15.8332 7.91758C15.8332 3.55262 12.2815 0.000976562 7.91656 0.000976562C3.55161 0.000976562 0 3.55258 0 7.91754C0 12.2825 3.55164 15.8341 7.9166 15.8341C9.7999 15.8341 11.5291 15.1708 12.8899 14.0692L17.3273 18.5066C17.4898 18.6691 17.7031 18.7508 17.9165 18.7508C18.1298 18.7508 18.3432 18.6691 18.5057 18.5066C18.8315 18.1808 18.8315 17.6541 18.5056 17.3283ZM7.9166 14.1675C4.46996 14.1675 1.66666 11.3642 1.66666 7.91754C1.66666 4.47089 4.46996 1.6676 7.9166 1.6676C11.3632 1.6676 14.1665 4.47089 14.1665 7.91754C14.1665 11.3642 11.3632 14.1675 7.9166 14.1675Z"
      fill="#868889"
    />
  </Svg>
);

const SettingsIcon = ({width=20, height=17, fill="#868889", ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 17"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.3631 1.54993H7.15559C6.84746 0.650108 5.98186 0 4.96414 0C3.94642 0 3.08081 0.650108 2.77269 1.54993H1.02329C0.616908 1.54993 0.287445 1.87387 0.287445 2.27345C0.287445 2.67302 0.616908 2.99697 1.02329 2.99697H2.77274C3.08086 3.89679 3.94646 4.5469 4.96419 4.5469C5.98191 4.5469 6.84751 3.89679 7.15564 2.99697H18.3631C18.7695 2.99697 19.099 2.67302 19.099 2.27345C19.099 1.87387 18.7695 1.54993 18.3631 1.54993ZM4.96414 3.09985C4.5007 3.09985 4.12366 2.72912 4.12366 2.27345C4.12366 1.81777 4.5007 1.44704 4.96414 1.44704C5.42758 1.44704 5.80462 1.81777 5.80462 2.27345C5.80462 2.72912 5.42758 3.09985 4.96414 3.09985Z"
      fill="#868889"
    />
    <Path
      d="M18.3631 7.74966H16.6136C16.3055 6.84985 15.4398 6.19974 14.4222 6.19974C13.4045 6.19974 12.5389 6.84985 12.2308 7.74966H1.02329C0.616908 7.74966 0.287445 8.07361 0.287445 8.47319C0.287445 8.87276 0.616908 9.19671 1.02329 9.19671H12.2308C12.5389 10.0965 13.4045 10.7466 14.4222 10.7466C15.4399 10.7466 16.3055 10.0965 16.6137 9.19671H18.3631C18.7695 9.19671 19.099 8.87276 19.099 8.47319C19.099 8.07361 18.7695 7.74966 18.3631 7.74966ZM14.4222 9.29959C13.9588 9.29959 13.5817 8.92886 13.5817 8.47319C13.5817 8.01751 13.9588 7.64678 14.4222 7.64678C14.8856 7.64678 15.2627 8.01751 15.2627 8.47319C15.2627 8.92886 14.8856 9.29959 14.4222 9.29959Z"
      fill="#868889"
    />
    <Path
      d="M18.3631 13.9494H10.3083C10.0002 13.0496 9.13457 12.3995 8.11685 12.3995C7.09912 12.3995 6.23352 13.0496 5.9254 13.9494H1.02329C0.616908 13.9494 0.287445 14.2733 0.287445 14.6729C0.287445 15.0725 0.616908 15.3964 1.02329 15.3964H5.9254C6.23352 16.2963 7.09912 16.9464 8.11685 16.9464C9.13457 16.9464 10.0002 16.2963 10.3083 15.3964H18.3631C18.7695 15.3964 19.099 15.0725 19.099 14.6729C19.099 14.2733 18.7695 13.9494 18.3631 13.9494ZM8.11685 15.4994C7.65341 15.4994 7.27636 15.1286 7.27636 14.673C7.27636 14.2173 7.65341 13.8466 8.11685 13.8466C8.58028 13.8466 8.95733 14.2172 8.95733 14.6729C8.95733 15.1286 8.58028 15.4994 8.11685 15.4994Z"
      fill="#868889"
    />
  </Svg>
);

export { NoIcon, WalmartIcon, SafeWayIcon, TraderJoesIcon, PrimaryButton, SecondaryButton, ArrowIcon, RemoveCartIcon, AddToCartIcon, GasIcon, SearchIcon, SettingsIcon };

