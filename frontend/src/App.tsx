import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "./components/Button";

const apiUrl = process.env.BACKEND_URL || 'http://localhost:3030';

function App() {
  const handleAddBook = async () => {
    console.log('Adding a new book...');

    await fetch(`${apiUrl}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Book', author: 'Unknown', pageCount: 100 }),
    });
  };

  return (
    <div className="App">
      <Button title="Add Book" onClick={handleAddBook} />
    </div>
  );
}

export default App;