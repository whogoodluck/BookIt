import Loading from '../components/common/loading'
import ExperienceCard from '../components/experience-card'
import { useExperience } from '../contexts/experience-context'

function Home() {
  const { experiences, isLoading } = useExperience()

  if (isLoading) {
    return <Loading />
  }

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
