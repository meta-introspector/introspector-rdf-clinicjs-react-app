import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
//import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import { GridColDef,  GridToolbarContainer } from "@mui/x-data-grid";

var seen = [];

function string_statement (obj) {
    return JSON.stringify(obj, function(key, val) {
	if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
		return;
            }
            seen.push(val);
	}
	return val;
    });
}

function render_statement (z) {

    const js = string_statement(z);
    return "FIXME" + js;
}
    
const statement = {
    field: 'statement',
    headerName: 'Statement',
    type: "custom",
    display: "flex",
    width: 650,
    renderCell: (params) => (<strong>
			     {
				 render_statement(params)
			     }
			     </strong>
			    ),
	    //${params.row.subject} ${params.row.predicate} ${params.row.object}
};
    
const columns: GridColDef[] = [
    { field: 'subject', headerName: 'Subject', width: 350 },
    { field: 'predicate', headerName: 'Predicate', width: 100 },
    { field: 'object', headerName: 'Object', width: 550 },
    statement
];

function construct_statement (z) {
    return {
	"id":z.join(" "),
	"subject": z[0],
	"predicate": z[1],
	"object": z[2],

    };
}

function clickMe() {
  alert("You clicked me!");
}

function handleSelect() {
  alert("You clicked me 1!");
}


function App() {

    const [statements, setStatements] = useState([
	construct_statement(["Empty statements","are","empty"])
    ]);

    const selectedItems = (ids) => {
	const selectedRowsData = ids.map((id) => statements.find((row) => row.id === id).subject);
	//console.log(selectedRowsData);
	alert("You clicked me test:" + JSON.stringify(selectedRowsData));
	//console.log("newSelectionModel ", newSelectionModel);
	// const addedCourses = newSelectionModel
	//   .filter((course) => !selectionModel.includes(course));
	// const removedCourses = selectionModel
	//   .filter((course) => !newSelectionModel.includes(course));
	// removedCourses.forEach((id) => { selectionMap[id] = 0; });
	// addedCourses.forEach((id) => { selectionMap[id] = 1; });
	// setSelectionModel(newSelectionModel);
	// setSelectedCourses(selectionMap);
	// onSelectionMapChange(selectionMap);
    };
    
    // function to fetch all statements from BE
    useEffect(() => {
	axios
	    .get("/data")
	    .then((response) => {
		// works:

		const res = response.data;
		if (res.constructor === Array) {
		    //console.log("Got array ", res);
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
//    console.log(typeof statements);
//    console.log(typeof statements[0]);
//    console.log(statements[0]);

  return (
    <div className="App">
`      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Experiments
	  <DataGrid
   checkboxSelection
onRowSelectionModelChange={selectedItems}
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <Button onClick={handleSelect}>
Handle selected</Button>
              </GridToolbarContainer>
            )}}
rows={statements}
columns={columns}

 sx={[
    {
        backgroundColor: 'white',
    }
  ]}

/>
	  </p>

      </header>

 <div>
        <button onClick={clickMe}>Default Button</button>
      </div>

    </div>

  );
}

export default App;
