import { useContext } from 'react';
import Link from 'next/link';
import { Scrollbar } from 'components/scrollbar';
import ActiveLink from 'components/active-link';
import { DrawerContext } from 'contexts/drawer/drawer.provider';
import CloseIcon from 'assets/icons/close';
import Logo from 'assets/icons/logo';
import {
  Facebook,
  Twitter,
  Youtube,
  Github,
  Instagram,
  Linkedin,
} from 'assets/icons/social-icons';


const menus = [
  {
    id: 1,
    pathname: '/',
    title: 'Accueil',
  },
  {
    id: 2,
    pathname: '/inscription',
    title: 'Inscription',
  },
  {
    id: 3,
    pathname: '/connexion',
    title: 'Connexion',
  },
  {
    id: 4,
    pathname: '/faq',
    title: 'FAQ',
  },
  {
    id: 5,
    pathname: '/terms',
    title: 'Terms & Conditions',
  }
];

const menusLogin = [
  {
    id: 1,
    pathname: '/',
    title: 'Accueil',
  },
  {
    id: 2,
    pathname: '/enregistrer_equipement',
    title: "Enregistrer l'équipement",
  },
  {
    id: 3,
    pathname: '/location',
    title: "Mettre en location un equipement",
  },
  {
    id: 4,
    pathname: '/vendre',
    title: "Mettre en vente un equipement",
  },
  {
    id: 5,
    pathname: '/faq',
    title: 'FAQ',
  },
  {
    id: 6,
    pathname: '/terms',
    title: 'Terms & Conditions',
  },
];

const social = [
  {
    id: 0,
    link: '/',
    icon: <Facebook />,
    className: 'facebook',
    title: 'facebook',
  },
  {
    id: 1,
    link: '/',
    icon: <Twitter />,
    className: 'twitter',
    title: 'twitter',
  },
  {
    id: 2,
    link: '/',
    icon: <Youtube />,
    className: 'youtube',
    title: 'youtube',
  },
  {
    id: 3,
    link: '/',
    icon: <Github />,
    className: 'github',
    title: 'github',
  },
  {
    id: 4,
    link: '/',
    icon: <Instagram />,
    className: 'instagram',
    title: 'instagram',
  },
  {
    id: 5,
    link: '/',
    icon: <Linkedin />,
    className: 'linkedin',
    title: 'linkedin',
  },
];

export default function DrawerMenu() {
  const { dispatch } = useContext(DrawerContext);
  const hideMenu = () => {
    dispatch({
      type: 'OPEN_MENU',
      payload: {
        menu: false,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-90px bg-gray-100 flex justify-start items-center relative px-30px flex-shrink-0">
          <Link href="/" className="flex" onClick={hideMenu}>
            <span className="sr-only">AgriConnect</span>
            {/* <Logo width="100px" id="medsy-menu-logo" /> */}
            <h2>AgriConnect</h2>
          </Link>

          <div className="flex items-center justify-end ml-auto pl-30px pr-50px text-gray-700 flex-shrink-0 lg:hidden">
            {/* <PhoneIcon /> */}
            <span className="font-semibold text-base text-14px ml-3">
              +242 06 472 34 24
            </span>
          </div>

          <button
            className="w-30px h-30px flex items-center justify-center text-gray-500 absolute right-25px focus:outline-none"
            onClick={hideMenu}
            aria-label="close"
          >
            <CloseIcon />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow">
          <div className="flex flex-col py-60px pb-40px lg:pb-60px">
            {
            typeof localStorage !== 'undefined' && localStorage.getItem('user')  ? 
            menusLogin.map((menu, index) => (
              <ActiveLink
                href={menu.pathname}
                activeClassName="font-semibold active"
                key={index}
                className="menu-item relative text-gray-900 pl-30px pr-4 mb-8 transition duration-300 ease-in-out last:mb-0 hover:text-gray-900"
                onClick={hideMenu}
              >
                {menu.title}
              </ActiveLink>
            ))
            :
            menus.map((menu, index) => (
              <ActiveLink
                href={menu.pathname}
                activeClassName="font-semibold active"
                key={index}
                className="menu-item relative text-gray-900 pl-30px pr-4 mb-8 transition duration-300 ease-in-out last:mb-0 hover:text-gray-900"
                onClick={hideMenu}
              >
                {menu.title}
              </ActiveLink>
            ))
          }
          </div>
        </Scrollbar>

        <div className="flex items-center justify-start border-t border-gray-300 bg-gray-100 h-12 px-30px flex-shrink-0 lg:hidden">
          {social.map((item, index) => (
            <a
              href={item.link}
              className={`social ${item.className}`}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <span className="sr-only">{item.title}</span>
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
