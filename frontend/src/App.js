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
		setStatements(JSON.stringify(error));
	    });
    }, []);
    
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
          <TableColumn>ID</TableColumn>
	  <TableColumn>Link</TableColumn>
        </TableHeader>
          <TableBody>
	  <TableRow key="hf">
	  <TableCell><pre><code>Hugging Face</code></pre></TableCell>
	  <TableCell><a href="https://huggingface.co/introspector">Hugging Face</a></TableCell>
	   </TableRow>

	  <TableRow key="gh">
	  <TableCell>
	  <pre><code>Github Repositories</code></pre></TableCell>
	  <TableCell><a href="https://github.com/meta-introspector">Github</a></TableCell>
	  </TableRow>

      	  <TableRow key="bp">
	  <TableCell>
	  <pre><code>Blog posts</code></pre></TableCell>
	  <TableCell><a href="https://h4ck3rm1k3.wordpress.com">Wordpress</a></TableCell>	  
	  </TableRow>

      	  <TableRow key="tweets">
	  <TableCell>
	  <pre><code>Tweets</code></pre></TableCell>
	  <TableCell><a href="https://x.com/introsp3ctor">Twitter</a></TableCell>	  
	  </TableRow>

          <TableRow key="statements">
	  <TableCell>
	  <pre><code>RDF Statements of knowledge from api</code></pre></TableCell>
	  <TableCell> {statements} </TableCell>	  
	  </TableRow>


	  </TableBody>
      </Table>
        </p>

      </header>
    </div>
  );
}

export default App;
