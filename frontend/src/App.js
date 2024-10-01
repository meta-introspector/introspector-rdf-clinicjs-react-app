import logo from './logo.svg';
import './App.css';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

function App() {
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
  

	  </TableBody>
      </Table>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
