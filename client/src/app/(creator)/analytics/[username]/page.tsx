type Params = {
  username: string;
};

export default function Page({ params }: { params: Params }) {
  return (
    <div className="py-10 w-[77.5rem] mx-auto">
      {/* Top Profile Card */}
      <section className="h-[12.75rem] py-10 px-16 border border-gray-300 rounded-badge">
        Profile Card
      </section>
      {/* Analytics Section */}
      <section className="mt-8">
        Analytics Section
      </section>
    </div>
  )
}