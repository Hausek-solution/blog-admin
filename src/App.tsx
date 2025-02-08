import { BrowserRouter, Routes } from 'react-router-dom'
import Provider from './provider'
import { CustomRoutes } from './routes/routes'

function App() {

  return (
    <>
        <BrowserRouter>
            <Provider>
                <Routes>{...CustomRoutes()}</Routes>
            </Provider>
        </BrowserRouter>
    </>
  )
}

export default App
