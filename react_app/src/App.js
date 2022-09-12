import Navbar from './components/Navbar';
import ThreadCard from './components/ThreadCard'

function App() {
  const threadData = {
    brand: 'DMC',
    brand_number: 445,
    name: 'blorple',
    hex_value: 'dodgerblue'
  }

  return (
    <div className='App'>
      <Navbar />
      <ThreadCard thread_data={threadData} skeins_owned='2'/>
    </div>
  );
}

export default App;
