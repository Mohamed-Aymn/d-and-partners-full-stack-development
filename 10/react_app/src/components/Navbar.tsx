import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Counter
      </NavLink>
      <NavLink to="/counter-enhanced" className={({ isActive }) => (isActive ? 'active' : '')}>
        Counter-Enhanced
      </NavLink>
      <NavLink to="/broken-fetch" className={({ isActive }) => (isActive ? 'active' : '')}>
        Broken Fetch
      </NavLink>
      <NavLink to="/working-fetch" className={({ isActive }) => (isActive ? 'active' : '')}>
        Working Fetch
      </NavLink>
      <NavLink to="/tailwind" className={({ isActive }) => (isActive ? 'active' : '')}>
        Tailwind
      </NavLink>
      <NavLink to="/shadcn" className={({ isActive }) => (isActive ? 'active' : '')}>
        Shadcn
      </NavLink>
    </nav>
  );
}

export default Navbar;
