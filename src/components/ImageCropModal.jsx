import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";

export default function ImageCropModal({ image, onCancel, onConfirm }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90vw] max-w-lg p-4">
        <div className="relative w-full h-[400px] bg-black">
          <Cropper
            image={image}
            objectFit="horizontal-cover"
            crop={crop}
            zoom={zoom}
            aspect={1}          // ⭐ 정사각형
            minZoom={1}
            maxZoom={5}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <input
          type="range"
          min={1}
          max={5}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-full mt-4"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-sm" onClick={onCancel}>
            취소
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onConfirm(croppedAreaPixels)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
