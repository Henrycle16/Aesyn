export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  
  interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  interface Flip {
    horizontal: boolean;
    vertical: boolean;
  }
  
  export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation: number = 0,
    flip: Flip = { horizontal: false, vertical: false }
  ): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      return null;
    }
  
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
  
    if (!croppedCtx) {
      return null;
    }
  
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;
  
    croppedCtx.drawImage(
      canvas,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return new Promise<string | null>((resolve, reject) => {
      croppedCanvas.toBlob((file) => {
        if (file) {
          resolve(URL.createObjectURL(file));
        } else {
          reject('Blob creation failed');
        }
      }, 'image/png');
    });
  }