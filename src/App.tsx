import { AuthenticationPage } from "./components/AuthenticationPage";
import { ModeToggle } from "./components/mode-toggle";
import DataPlatformLandingPage from "./Pahe/HomePage";

function App() {
  return (
    <div>
      <ModeToggle />
      <AuthenticationPage />
      <DataPlatformLandingPage />
    </div>
  )
}

export default App;
