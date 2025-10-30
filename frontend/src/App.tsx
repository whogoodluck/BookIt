import { Route, Routes } from 'react-router-dom'
import Header from './components/common/header'
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
        </Routes>
      </main>
    </>
  )
}

export default App
