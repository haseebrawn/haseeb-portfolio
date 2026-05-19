import Card from '../common/Card'
import { getSkillIcon } from '../../utils/iconMap'

const SkillCard = ({ skill }) => {
  const Icon =
    typeof skill.icon === 'string' ? getSkillIcon(skill.icon) : skill.icon

  return (
    <Card className="group p-6" hover>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-soft transition group-hover:bg-white">
          <Icon className={`text-4xl ${skill.color}`} />
        </div>

        <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-primary">
          {skill.level}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-dark">{skill.name}</h3>
      <p className="mt-2 text-sm font-semibold text-primary">{skill.category}</p>
      <p className="mt-3 text-sm leading-7 text-muted">{skill.description}</p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-muted">Skill Level</span>
          <span className="text-xs font-bold text-primary">{skill.percentage}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-border">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${skill.percentage}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

export default SkillCard