import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiNpm,
} from 'react-icons/si'
import { FiCode, FiDatabase, FiServer } from 'react-icons/fi'

const iconMap = {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiNpm,
  FiCode,
  FiDatabase,
  FiServer,
}

export const getSkillIcon = (iconName) => {
  return iconMap[iconName] || FiCode
}