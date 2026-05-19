import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  FiBriefcase,
  FiCode,
  FiFolder,
  FiGrid,
  FiLogOut,
  FiMail,
  FiUser,
} from 'react-icons/fi'
import { profile } from '../data/profile'
import { useAuth } from '../context/AuthContext'

const adminLinks = [
  { label: 'Dashboard', path: '/admin', icon: FiGrid },
  { label: 'Projects', path: '/admin/projects', icon: FiFolder },
  { label: 'Skills', path: '/admin/skills', icon: FiCode },
  { label: 'Experience', path: '/admin/experience', icon: FiBriefcase },
  { label: 'Profile', path: '/admin/profile', icon: FiUser },
  { label: 'Messages', path: '/admin/messages', icon: FiMail },
]

const AdminLayout = () => {
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-soft">
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-border bg-white p-6 lg:block">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue text-lg font-black text-white">
            MH
          </div>

          <div>
            <p className="mt-1 font-black text-dark">{admin?.name || 'Admin'}</p>
            {/* <p className="text-sm text-muted">Portfolio Dashboard</p> */}
          </div>
        </div>

        {/* <div className="mt-6 rounded-2xl bg-soft p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">
            Logged in as
          </p>
          <p className="mt-1 font-black text-dark">{admin?.name || 'Admin'}</p>
          <p className="mt-1 text-sm text-muted">{admin?.email}</p>
        </div> */}

        <nav className="mt-8 space-y-2">
          {adminLinks.map((link) => {
            const Icon = link.icon

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                      : 'text-muted hover:bg-soft hover:text-primary'
                  }`
                }
              >
                <Icon />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary"
        >
          <FiLogOut />
          Logout
        </button>
      </aside>

      <main className="lg:ml-72">
        <header className="sticky top-0 z-40 border-b border-border bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h1 className="text-xl font-black text-dark">Portfolio Admin</h1>
              {/* <p className="text-sm text-muted">
                Manage {profile.name} portfolio content
              </p> */}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-2xl bg-soft px-4 py-2 text-sm font-semibold text-primary md:block">
                {profile.role}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-bold text-muted transition hover:border-primary hover:text-primary lg:hidden"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {adminLinks.map((link) => {
              const Icon = link.icon

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/admin'}
                  className={({ isActive }) =>
                    `flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-soft text-muted hover:text-primary'
                    }`
                  }
                >
                  <Icon />
                  {link.label}
                </NavLink>
              )
            })}
          </nav>
        </header>

        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout