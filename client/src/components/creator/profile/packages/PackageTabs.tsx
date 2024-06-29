import { useState, useEffect } from "react";

type Props = {
  socialMediaTypes: string[];
  packages: any[];
};

const PackageTabs = ({packages, socialMediaTypes}: Props) => {
  const [socialMediaTab, setSocialMediaTab] = useState(socialMediaTypes[0]);

  useEffect(() => {
    if (socialMediaTypes.length === 1) {
      setSocialMediaTab(socialMediaTypes[0]);
    }
  }, [socialMediaTypes]);

  return (
    <div className="my-5 flex gap-6">
      {socialMediaTypes.map((socialMediaType, index) => (
        <button
          key={index}
          className={`mb-2 font-medium ${
            socialMediaTab === socialMediaType
              ? "underline decoration-2 underline-offset-8"
              : "text-[#4A4A4A]"
          }`}
          onClick={() => setSocialMediaTab(socialMediaType)}
        >
          {socialMediaType}
        </button>
      ))}
    </div>
  );
};

export default PackageTabs;
