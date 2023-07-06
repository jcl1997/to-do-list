import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Tasks from "./Components/Tasks";

function App() {
  return (
    <div className="App">
      <>
        <ToastContainer />
        <div className="wrapper">
          <div className="d-flex flex-column">
            <nav className="navbar navbar-expand navbar-dark-subtle bg-light topbar mb-4 static-top shadow">
              <h1>To-do List</h1>
            </nav>
          </div>
          <div className="container-fluid">
            <Tasks />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
