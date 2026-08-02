import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Working Fetch
      </NavLink>
      <NavLink to="/broken-fetch" className={({ isActive }) => (isActive ? 'active' : '')}>
        Broken Fetch
      </NavLink>
      <NavLink to="/server-state" className={({ isActive }) => (isActive ? 'active' : '')}>
        Server State
      </NavLink>
      <NavLink to="/store-state" className={({ isActive }) => (isActive ? 'active' : '')}>
        Store State
      </NavLink>
      <NavLink to="/store-state-enhanced" className={({ isActive }) => (isActive ? 'active' : '')}>
        Store State Enhanced
      </NavLink>
      <NavLink to="/with-prop-drilling" className={({ isActive }) => (isActive ? 'active' : '')}>
        With Prop Drilling
      </NavLink>
      <NavLink to="/without-prop-drilling" className={({ isActive }) => (isActive ? 'active' : '')}>
        Without Prop Drilling
      </NavLink>
      <NavLink to="/without-prop-drilling-optimized" className={({ isActive }) => (isActive ? 'active' : '')}>
        Without Prop Drilling Optimized
      </NavLink>
    </nav>
  );
}

export default Navbar;
