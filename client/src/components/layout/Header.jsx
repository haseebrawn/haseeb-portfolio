import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Container from '../common/Container'
import Button from '../common/Button'
import { useProfile } from '../../context/ProfileContext'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { profile } = useProfile()

  const initials =
    profile.name
      ?.split(' ')
      .map((item) => item[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'MH'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-blue text-lg font-black text-white shadow-lg shadow-blue-500/20">
              {initials}
            </div>

            <div>
              <h2 className="text-lg font-black text-dark">{profile.name}</h2>
              <p className="text-xs font-semibold text-muted">{profile.role}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? 'bg-soft text-primary'
                      : 'text-muted hover:bg-soft hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button to="/contact" variant="secondary">
              Hire Me
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft text-primary lg:hidden"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-border py-5 lg:hidden">
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-soft text-muted hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Button to="/contact" className="mt-2 w-full justify-center">
                Hire Me
              </Button>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header