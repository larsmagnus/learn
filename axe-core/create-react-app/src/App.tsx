import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header role="banner" className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />
      </header>
      <main role="main">
        <h1>
          Edit <code>src/App.tsx</code> and save to reload.
        </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </main>
    </div>
  );
}

export default App;
