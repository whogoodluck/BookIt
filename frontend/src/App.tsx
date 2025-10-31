import { Route, Routes } from 'react-router-dom'
import Header from './components/common/header'
import Checkout from './pages/checkout-page'
import Confirmation from './pages/confirmation-page'
import ExperienceDetails from './pages/experience-details-page'
import Home from './pages/home-page'

function App() {
  return (
    <>
      <Header />
      <main className='px-2 md:px-8 lg:px-12 xl:px-[124px]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/experiences/:id' element={<ExperienceDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/confirmation' element={<Confirmation />} />
        </Routes>
      </main>
    </>
  )
}

export default App
