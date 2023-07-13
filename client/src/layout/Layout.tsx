import LevSlider from '../components/leverageSlider/levSlider'
import Navbar from '../components/navbar/Navbar'
import Charts from '../components/Charts'
import backgroundImage from '../assets/images/HugeDomains_com.jpeg'


const Layout = (props: any) => {


  return (
    <div className='flex justify-center w-screen min-h-screen bg-slate-300'>
      <div className="w-screen min-h-screen p-1 sm:full-screen"  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <div className='sm:flex '>
          <Charts />
          <LevSlider />
        </div>
      </div>
    </div>
  )
}

export default Layout