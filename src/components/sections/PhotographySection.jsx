export default function PhotographySection({ photos }) {
  return (
    <section id="photography" className="section-frame section-light border-b border-[var(--border-soft)]">
      <div className="mx-auto max-w-[88rem] px-4 py-16 text-center md:px-8 lg:py-24">
        <p className="section-eyebrow">Field Observations</p>
        <h2 className="photo-title">Photography.</h2>
        <p className="photo-note">
          Capturing raw texture, structure, and light across automotive
          and conceptual environments.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {photos.map((photo) => (
            <figure key={photo.title} className="photo-frame">
              <img src={photo.src} alt={photo.alt} className="photo-image" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
