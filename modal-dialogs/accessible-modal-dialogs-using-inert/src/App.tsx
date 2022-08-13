import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean | null>(null);
  const dialogOpenerRef = useRef<HTMLButtonElement>(null);
  const dialogActionRef = useRef<HTMLButtonElement>(null);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const handleKeyboard = useCallback(
    (event: KeyboardEvent) => {
      if (isDialogOpen && event.key === "Escape") {
        setIsDialogOpen(false);
      }
    },
    [isDialogOpen]
  );

  // Global "Escape" listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  // Focus management
  useEffect(() => {
    if (typeof isDialogOpen !== "boolean") return;

    if (isDialogOpen) {
      dialogActionRef?.current?.focus();
    } else {
      dialogOpenerRef?.current?.focus();
    }
  }, [isDialogOpen]);

  return (
    <div className="App">
      <div className={`dialog ${isDialogOpen ? "dialog--open" : ""}`}>
        <div
          role="dialog"
          id="dialog1"
          aria-labelledby="dialog1Title"
          aria-describedby="dialog1Description"
          aria-modal="true"
          className="dialog__container"
        >
          <h2 id="dialog1Title">Simple dialog example</h2>
          <p id="dialog1Description">
            This is a simple dialog example that uses inert to create a
            focus-trap within the dialog.
          </p>
          <p>
            The inert attribute will only work if your{" "}
            <a href="https://caniuse.com/?search=inert">browser supports it</a>
          </p>

          <button onClick={toggleDialog} ref={dialogActionRef}>
            Close
          </button>
        </div>
      </div>

      <main inert={isDialogOpen ? "" : undefined}>
        <h1>Accessible dialog example using inert</h1>
        <p>
          Try tabbing to all the elements before and after opening the dialog
        </p>
        <button onClick={toggleDialog} ref={dialogOpenerRef}>
          Open dialog
        </button>
        <form>
          <label htmlFor="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" />

          <button>Submit</button>
        </form>

        <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert">
          Learn more
        </a>
      </main>
    </div>
  );
}

export default App;
