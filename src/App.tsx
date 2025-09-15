import { AuthenticationPage } from "./components/AuthenticationPage";
import { ModeToggle } from "./components/mode-toggle";
import DashboardPage from "./dashboard";
import ProgressEntryForm from "./dashboard/AddEntry";
import DataPlatformLandingPage from "./Pahe/HomePage";

function App() {
  return (
    <div>
      <ModeToggle />
      <AuthenticationPage />
      {/* <DataPlatformLandingPage /> */}
      <DashboardPage />
      {/* <ProgressEntryForm /> */}
    </div>
  )
}

export default App;
