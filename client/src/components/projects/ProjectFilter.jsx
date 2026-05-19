import {
  FiBarChart2,
  FiCode,
  FiGrid,
  FiMonitor,
  FiShoppingBag,
} from 'react-icons/fi'

const filters = [
  {
    label: 'All',
    value: 'All',
    icon: FiGrid,
  },
  {
    label: 'Web Apps',
    value: 'Web App',
    icon: FiMonitor,
  },
  {
    label: 'Dashboards',
    value: 'Dashboard',
    icon: FiBarChart2,
  },
  {
    label: 'Ecommerce',
    value: 'Ecommerce',
    icon: FiShoppingBag,
  },
  {
    label: 'APIs',
    value: 'API',
    icon: FiCode,
  },
]

const ProjectFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-3 rounded-3xl border border-border bg-white p-3 shadow-sm">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = activeFilter === filter.value

        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                : 'text-muted hover:bg-soft hover:text-primary'
            }`}
          >
            <Icon />
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

export default ProjectFilter