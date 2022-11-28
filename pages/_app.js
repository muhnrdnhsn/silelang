import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const {hasNavbar} = pageProps
  return (
    <div className='relative'>
      { hasNavbar && <Navbar/>}
      <Component {...pageProps} />
    </div>    
  )
}

export default MyApp
