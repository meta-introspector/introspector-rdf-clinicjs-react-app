import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

function App() {

    const [statements, setStatements] = useState([
	"Empty statements"
    ]);
    
    // function to fetch all statements from BE
    useEffect(() => {
	axios
	    .get("/data")
	    .then((response) => {
		console.log("Got data ", response.data);
		setStatements(JSON.stringify(response.data));
	    })
	    .catch((error) => {
		console.log("There was an error retrieving the statement list: ", error);
		setStatements([["error","text",JSON.stringify(error)]]);
	    });
    }, []);
    console.log("statements ", statements);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Experiments
	  <Table
              aria-label="Experiments"
	  >
        <TableHeader>
          <TableColumn>Subject</TableColumn>
	  <TableColumn>Predicate</TableColumn>
	  <TableColumn>Object</TableColumn>
        </TableHeader>
      
          <TableBody>
	  {statements.map((statement,index)=>(
		  <TableRow key={index}>
		  <TableCell>{statement[0]}</TableCell>
		  <TableCell>{statement[1]}</TableCell>
		  <TableCell>{statement[2]}</TableCell>
		  </TableRow>
	      
	  ))}
	  </TableBody>
      </Table>
        </p>

      </header>
    </div>
  );
}

export default App;
