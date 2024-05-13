import { BrowserRouter,Route,Routes } from "react-router-dom";
import ShowCuentas from './components/ShowCuentas';
import CrearMovimiento from "./components/CrearMovimiento";
import BuscarMovimiento from "./components/BuscarMovimiento";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ShowCuentas></ShowCuentas>}> </Route>
    <Route path="/crear-movimiento" element={<CrearMovimiento/>} /> {/* Nueva ruta */}
    <Route path="/buscar-movimiento" element={<BuscarMovimiento/>} /> {/* Nueva ruta */}
    </Routes>
    </BrowserRouter>

  )
}

export default App;
