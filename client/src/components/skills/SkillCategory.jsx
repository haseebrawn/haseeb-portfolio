import SkillCard from './SkillCard'
import SectionTitle from '../common/SectionTitle'

const SkillCategory = ({ title, description, skills }) => {
  if (!skills.length) return null

  return (
    <div className="mb-16 last:mb-0">
      <SectionTitle
        title={title}
        description={description}
        className="mb-8"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default SkillCategory