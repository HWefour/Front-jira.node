import "./App.css";
import Form from "./Components/form/Form";
import TableData from "./Components/table/TableData";

function App() {
  return (
    <>
        <div className="titre_container">
          <h1>Demandes Emises sur ImmopenIo</h1>
        </div>
      <div className="content_wrapper">
        <div className="form-container">
          <Form />
        </div>
        <div className="table-container">
          <TableData />
        </div>
      </div>
    </>
  );
}

export default App;
