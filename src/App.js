import { Fragment } from "react";
import Mainpage from "./Pages/Mainpage";
import CalendarContextProvider from "./Context/CalendarContext";

function App() {
  return (
    <CalendarContextProvider>
      <Fragment>
        <Mainpage />
      </Fragment>
    </CalendarContextProvider>
  );
}

export default App;
