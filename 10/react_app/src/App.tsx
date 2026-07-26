import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Counter from './pages/Counter';
import CounterEnhanced from './pages/CounterEnhanced';
import BrokenFetch from './pages/BrokenFetch';
import WorkingFetch from './pages/WorkingFetch';
import Tailwind from './pages/Tailwind';
import Shadcn from './pages/Shadcn';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/counter-enhanced" element={<CounterEnhanced />} />
          <Route path="/broken-fetch" element={<BrokenFetch />} />
          <Route path="/working-fetch" element={<WorkingFetch />} />
          <Route path="/tailwind" element={<Tailwind />} />
          <Route path="/shadcn" element={<Shadcn />} />
        </Routes>
      </main>
    </HashRouter>
  )
}

export default App
