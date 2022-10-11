import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import RoutesComponent from 'src/routes'
// import Loading from './components/Loading/Loading'

function App() {
  return (
    <div className="App">
      {/* <Loading /> */}
      <RoutesComponent />
      <ToastContainer />
    </div>
  )
}

export default App
