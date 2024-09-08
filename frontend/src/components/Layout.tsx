import Header from './Header'
import Footer from './Footer'
import { ReactNode } from 'react'


interface LayoutInterface{
  children:ReactNode
}



const Layout:React.FC<LayoutInterface> = ({children}) => {
  return (
    <div className='h-screen'>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout