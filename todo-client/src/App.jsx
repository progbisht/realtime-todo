
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { DataProvider } from './context/DataProvider'
import AddTask from './AddTask'


function App() {


  return (
    <div className='app'>
      <Header
        title="What do you want to do today?" />
        <DataProvider>
          <AddTask/>
          <section className='container'>
            <Content/>
          </section>
          <Footer/>
        </DataProvider>

    </div>
  )
}

export default App
