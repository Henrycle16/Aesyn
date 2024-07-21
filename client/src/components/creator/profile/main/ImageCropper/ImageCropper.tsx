import Upload from "@/components/ui/svgs/Upload";
import React, { useRef, useState } from "react";
import Image from "next/image";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./SetCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  updateAvatar: (imgSrc: string) => void;
  closeModal?: () => void; // Optional prop to handle closing modal
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  updateAvatar,
  closeModal,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = document.createElement("img");
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e: Event) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } =
          e.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150x150 pixels");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onImageLoad = (e: React.ChangeEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const changeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    setImgSrc(null); 
    setCrop(undefined); 
    setError(null);
    fileInputRef.current?.click(); 
  };

  return (
    <div>
      {!imgSrc && (
        <>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={onSelectFile}
          />
          <div
            className="border-dotted border-2 rounded-md cursor-pointer border-gray-300 flex justify-center items-center flex-col py-32 w-full"
            onClick={triggerFileInput}
          >
            <Upload />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </>
      )}
      {imgSrc && (
        <div
          className="modal-content"
          style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}
        >
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <Image
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              width={432}
              height={284}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "74px" }}>
            <button
              className="border-solid border-2 border-[#3798E3] py-2 px-6 rounded-md flex items-center justify-center hover:bg-[#F5F5F5] text-[#3798E3] font-semibold"
              onClick={changeImage} 
            >
              Change Image
            </button>
            <button
              className="bg-[#3798E3] text-white font-bold py-3 px-7 capitalize rounded-md hover:bg-[#2C7AB6] ml-3"
              onClick={() => {
                if (imgRef.current) {
                  setCanvasPreview(
                    previewCanvasRef.current as HTMLCanvasElement,
                    imgRef.current as HTMLImageElement,
                    convertToPixelCrop(
                      crop!,
                      imgRef.current.width,
                      imgRef.current.height
                    )
                  );
                  const dataUrl = previewCanvasRef.current?.toDataURL();
                  if (dataUrl) {
                    updateAvatar(dataUrl);
                    if (closeModal) closeModal(); 
                  }
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </div>
  );
};

export default ImageCropper;
