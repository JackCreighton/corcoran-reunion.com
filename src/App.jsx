import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Photos from './pages/Photos/Photos';
import ReunionDetails from './pages/ReunionDetails/ReunionDetails';
import FamilyTree from './pages/FamilyTree/FamilyTree';
import Donate from './pages/Donate/Donate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="photos" element={<Photos />} />
          <Route path="reunion-details" element={<ReunionDetails />} />
          <Route path="family-tree" element={<FamilyTree />} />
          <Route path="donate" element={<Donate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
