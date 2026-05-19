import Container from '../../common/Container'
import SectionTitle from '../../common/SectionTitle'
import Card from '../../common/Card'

const ProjectResultsGallery = ({ project }) => {
  const results = project.results || []
  const images = project.images || []
  const galleryLabels = project.gallery || []

  return (
    <section className="section-padding bg-soft">
      <Container>
        <SectionTitle
          badge="Results & Gallery"
          title="Project results and visual preview"
          description="A quick look at project outcomes, interface screens, and important project sections."
          align="center"
        />

        {results.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {results.map((result) => (
              <Card key={`${result.value}-${result.label}`} className="p-6 text-center">
                <h3 className="text-4xl font-black text-primary">
                  {result.value}
                </h3>

                <p className="mt-2 text-sm font-semibold text-muted">
                  {result.label}
                </p>
              </Card>
            ))}
          </div>
        )}

        {images.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {images.map((imageUrl) => (
              <div
                key={imageUrl}
                className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm"
              >
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="h-80 w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {galleryLabels.map((item) => (
              <Card key={item} className="gradient-soft p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-2xl font-black text-primary shadow-sm">
                  UI
                </div>

                <h3 className="mt-5 text-xl font-black text-dark">{item}</h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Gallery preview placeholder. Upload project images from admin
                  dashboard to replace this section.
                </p>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default ProjectResultsGallery