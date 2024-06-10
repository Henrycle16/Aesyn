import PackageCard from "./PackageCard";
import NewPackageCard from "./NewPackageCard";

const packagesData = [
  {
    id: 0,
    socialMedia: "Instagram",
    packageType: "Reel Post",
    packageDescription: "15 sec video post",
    price: "$100",
  },
  {
    id: 1,
    socialMedia: "Instagram",
    packageType: "Photo Post",
    packageDescription: "Single photo post",
    price: "$50",
  },
  {
    id: 2,
    socialMedia: "Instagram",
    packageType: "Multi-Photo Post",
    packageDescription: "3 photo post",
    price: "$125",
  },
]

const displayText = packagesData.length !== 0 ? "invisible" : "";

const Packages = () => {
  return (
    <section className="border border-gray-300 rounded-badge min-h-[22rem] p-10 flex flex-col text-[#184465]">
      <h1 className="text-2xl font-semibold">Packages</h1>
      <p className={`text-sm font-medium mt-2 ${displayText}`}>
        Create our content packages to display for brands to purchase.
      </p>
      <div className="flex-1 mt-4 ml-8 flex gap-5">
        {/* IG Package */}
        {packagesData.map((packageData) => (
          <PackageCard
            key={packageData.id}
            socialMedia={packageData.socialMedia}
            packageType={packageData.packageType}
            packageDescription={packageData.packageDescription}
            price={packageData.price}
          />
        ))}
        {/* Add new package Component */}
        <NewPackageCard />
      </div>
    </section>
  );
};

export default Packages;
