import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
//import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { DataGrid } from '@mui/x-data-grid';
const columns: GridColDef[] = [
    { field: 'subject', headerName: 'Subject', width: 350 },
    { field: 'predicate', headerName: 'Predicate', width: 350 },
    { field: 'object', headerName: 'Object', width: 550 },
];

function construct_statement (z) {
    return {
	"id":z[0],
	"subject": z[0],
	"predicate": z[1],
	"object": z[2],

    };
}

function App() {

    const [statements, setStatements] = useState([
	construct_statement(["Empty statements","are","empty"])
    ]);
    
    // function to fetch all statements from BE
    useEffect(() => {
	axios
	    .get("/data")
	    .then((response) => {
		// works:

		const res = response.data;
		if (res.constructor === Array) {
		    console.log("Got array ", res);
		    setStatements(res.map(construct_statement ));
		}else{
		    setStatements([
			construct_statement(
			[
			    'res','type',typeof(res)
			]
		    )]);
		}
	    })
	    .catch((error) => {
		console.log("There was an error retrieving the statement list: ", error);
		setStatements(
		    [
			construct_statement(["error","text",JSON.stringify(error)])]);
	    });
    }, []);
    //console.log("statements ", statements);
    console.log(typeof statements);
    console.log(typeof statements[0]);
    console.log(statements[0]);

  return (
    <div className="App">
`      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Experiments
	  <DataGrid rows={statements} columns={columns} />
	  </p>

      </header>
    </div>
  );
}

export default App;
