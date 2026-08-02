import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import BrokenFetch from './pages/BrokenFetch';
import WorkingFetch from './pages/WorkingFetch';
import './App.css'
import ServerState from './pages/ServerState';
import StoreState from './pages/StoreState';
import StoreStateEnhanced from './pages/StoreStateEnhanced';
import WithPropDrilling from './pages/WithPropDrilling';
import WithoutPropDrilling from './pages/WithoutPropDrilling';
import WithoutPropDrillingOptimized from './pages/WithoutPropDrillingOptimized';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<WorkingFetch />} />
          <Route path="/broken-fetch" element={<BrokenFetch />} />
          <Route path="/server-state" element={<ServerState />} />
          <Route path="/store-state" element={<StoreState />} />
          <Route path="/store-state-enhanced" element={<StoreStateEnhanced />} />
          <Route path="/with-prop-drilling" element={<WithPropDrilling />} />
          <Route path="/without-prop-drilling" element={<WithoutPropDrilling />} />
          <Route path="/without-prop-drilling-optimized" element={<WithoutPropDrillingOptimized />} />
        </Routes>
      </main>
    </HashRouter>
  )
}

export default App
