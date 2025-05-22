import React, { useState } from 'react';
import { TbMenuDeep }   from 'react-icons/tb';
import { RiCloseFill }  from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/header-footer.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname }            = useLocation();

  const toggle = () => setMenuOpen(p => !p);
  const close  = () => setMenuOpen(false);

  const showStatus = pathname === '/';      
  const openToWork = true;                  // flip 

  return (
    <header className="header">
      
      {menuOpen
        ? <RiCloseFill className="menu-icon" onClick={toggle} />
        : <TbMenuDeep  className="menu-icon" onClick={toggle} />}

      
      {showStatus && (
        <a
          href="/assets/Ujwal_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={openToWork ? 'work-status open' : 'work-status closed'}
          title="View Resume"
        >
          <span className="dot" />
          {openToWork ? 'Seeking Full-Time Opportunities!' : 'Not Looking For New Roles'}
        </a>
      )}

      {/* slide-out nav */}
      <ul className={menuOpen ? 'show-header' : 'hide-header'}>
        {[
          { to:'/',          label:'Home'     },
          { to:'/about',     label:'About'    },
          { to:'/projects',  label:'Projects' },
        ].map(({to,label}) => (
          <li key={to}>
            <Link
              to={to}
              state={{ fromNav:true }}
              onClick={e => {
                if (pathname === to) e.preventDefault(); // already on page
                close();
              }}
              className={pathname === to ? 'active' : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {menuOpen && <div className="menu-overlay" onClick={close} />}
    </header>
  );
}

export default Header;
