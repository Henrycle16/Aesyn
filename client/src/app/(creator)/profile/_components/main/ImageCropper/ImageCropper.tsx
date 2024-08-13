import Upload from "@/components/svgs/Upload";
import React, { useRef, useState } from "react";
import Image from "next/image";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./AvatarCanvas";

// Constants for aspect ratio and minimum dimension of the crop area
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  updateAvatar: (imgSrc: string, imageName: string) => void;
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
  const [imageName, setImageName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handler for selecting a file
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const fileName = file.name;
    setImageName(fileName);

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

  // Function to trigger the file input dialog
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handler for when the image loads in the cropper
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

  // Handler for changing the image
  const changeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImgSrc(null);
    setCrop(undefined);
    setError(null);
    fileInputRef.current?.click();
  };

  return (
    <>
      {!imgSrc && (
        <div className="px-20">
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
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>
      )}
      {/* If an image is selected, show the cropping interface */}
      {imgSrc && (
        <div
          className="modal-content"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div className="px-20">
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
                width={432.01}
                height={284.01}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "74px",
            }}
          >
            <button
              className="secondary-btn font-semibold"
              onClick={changeImage}
            >
              Change Image
            </button>
            <button
              className="save-btn px-7 ml-3"
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
                    updateAvatar(dataUrl, imageName);
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
      {/* Hidden canvas for generating the preview of the cropped image */}
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
    </>
  );
};

export default ImageCropper;
