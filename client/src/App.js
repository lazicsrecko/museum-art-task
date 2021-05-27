import "./App.css";
import MainComponent from './components/MainComponent';
import ServiceContextProvider from "./services/ServiceContext";

function App() {
  return (
    <ServiceContextProvider>
      <MainComponent />
    </ServiceContextProvider>
  );
}

export default App;
