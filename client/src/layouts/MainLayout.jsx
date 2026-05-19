import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProfileStatus from '../components/common/ProfileStatus'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-dark">
      <Header />
      <ProfileStatus />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout