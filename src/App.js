import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Component/Home.js"));
const Map = lazy(() => import("./Component/Map.js"));
const Table = lazy(() => import("./Component/Table.js"));
const Chart = lazy(() => import("./Component/Chart.js"));
const NoMatch = lazy(() => import("./Component/NoMatch.js"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/table" element={<Table />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
}

export default App;
