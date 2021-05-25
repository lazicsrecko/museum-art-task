import "./App.css";
import MainComponent from './components/main-component';
import ServiceContextProvider from "./services/ServiceContext";

function App() {
  return (
    <ServiceContextProvider>
      <MainComponent />
    </ServiceContextProvider>
  );
}

export default App;
