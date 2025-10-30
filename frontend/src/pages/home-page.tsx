import Loading from '../components/common/loading'
import ExperienceCard from '../components/experience-card'
import { useGetExperiences } from '../hooks/useExperience'
import type { Experience } from '../types/experience'

function Home() {
  const { data, isPending } = useGetExperiences()

  if (isPending) {
    return <Loading />
  }

  const experiences: Experience[] = data.data || []

  return (
    <section className='py-4 md:py-8 lg:py-12'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {experiences.map(experience => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  )
}

export default Home
