import './App.css';
import Routings from './routes/Routings';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {

  const client = new QueryClient()

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Routings />
      </QueryClientProvider>
    </div>
  );
}

export default App;
