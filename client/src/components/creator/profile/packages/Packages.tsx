import "@/styles/packagesScrollbar.css";
import PackageCard from "./PackageCard";
import NewPackageButton from "./NewPackageButton";
import AddPackage from "./modals/AddPackage";

const packagesData = [
  {
    packageId: 0,
    socialMedia: "Instagram",
    type: "Reel Post",
    description: "15 sec video post",
    price: 100,
    quantity: 1,
  },
  {
    packageId: 1,
    socialMedia: "Instagram",
    type: "Photo Post",
    description: "Single photo post",
    price: 50,
    quantity: 1,
  },
  {
    packageId: 2,
    socialMedia: "Instagram",
    type: "Multi-Photo Post",
    description: "3 photo post",
    price: 125,
    quantity: 3,
  },
  // {
  //   packageId: 3,
  //   socialMedia: "Instagram",
  //   type: "Multi-Photo Post",
  //   description: "3 photo post",
  //   price: 125,
  //   quantity: 1,
  // },
  // {
  //   packageId: 4,
  //   socialMedia: "Instagram",
  //   type: "Multi-Photo Post",
  //   description: "3 photo post",
  //   price: 125,
  //   quantity: 1,
  // },
];

const Packages = () => {
  return (
    <section className="border border-gray-300 rounded-badge min-h-[22rem] px-10 pb-10 pt-8 flex flex-col text-[#184465]">
      {/* Packages Header Container */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold self-end mb-2">Packages</h1>
        <NewPackageButton />
      </div>
      {!packagesData.length && <p className="text-sm font-medium mt-10">
        Create our content packages to display for brands to purchase.
      </p>}
      {/* Package Cards Container */}
      <div className="flex-1 mt-6 ml-8 gap-5 flex whitespace-nowrap overflow-x-auto">
        {/* IG Package */}
        {packagesData.map((packageData) => (
          <PackageCard
            key={packageData.packageId}
            {...packageData}
          />
        ))}
      </div>
      {/* Add Package Modal */}
      <AddPackage />
    </section>
  );
};

export default Packages;
