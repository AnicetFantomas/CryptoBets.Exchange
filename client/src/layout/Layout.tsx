import LevSlider from '../components/leverageSlider/levSlider'
import Navbar from '../components/navbar/Navbar'
import Charts from '../components/Charts'


const Layout = (props: any) => {


  return (
    <div className='flex justify-center w-screen min-h-screen bg-slate-300'>
      <div className="w-screen min-h-screen p-1 sm:full-screen bg-sky-800">
        <div>
          <Navbar />
        </div>

        <div className='sm:flex '>
          <Charts />
          <LevSlider />
        </div>
      </div>
    </div>
  )
}

export default Layout