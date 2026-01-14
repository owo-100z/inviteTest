import React, { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

import ImageCropModal from "./ImageCropModal";
import { getCroppedImage } from "./cropImage.js";

export default function ImageUploaderSingle({ label, onChangeFile, initImage = null, onDeleteImage, type, crop = false }) {
  const [file, setFile] = useState(null); // 단일 파일
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cropImage, setCropImage] = useState(null);

  const imgInput = useRef(null);

  useEffect(() => {
    if (initImage) {
      const thumb = {
        origin: initImage,
        thumbURL: initImage.replace(/(\.\w+)?$/, '_thumb$1') // 썸네일 URL 생성 로직 예시
      }
      setPreview(thumb);
    }
  }, [initImage]);

  const updateFile = async (incomingFile) => {
    if (!incomingFile) return;

    const thumb = await makePreviews(incomingFile);

    setFile(incomingFile);
    setPreview(thumb);

    if (onChangeFile) onChangeFile(incomingFile, type);
  };

  // 이미지 preview 만들기
  const makePreviews = async (file) => {
    const thumb = await imageCompression(file, {
      maxWidthOrHeight: 300,
      initialQuality: 0.7,
      useWebWorker: true,
    })

    const thumbURL = URL.createObjectURL(thumb);

    return {
      origin: file,
      thumbURL: thumbURL
    }
  }

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      if (crop) {
        setCropImage(URL.createObjectURL(selected));
      } else {
        updateFile(selected);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) {
      if (crop) {
        setCropImage(URL.createObjectURL(dropped));
      } else {
        updateFile(dropped);
      }
    }
  };

  const handleCropConfirm = async (croppedAreaPixels) => {
    const croppedFile = await getCroppedImage(cropImage, croppedAreaPixels);
    updateFile(croppedFile);
    setCropImage(null);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    imgInput.current.value = null;
    if (onChangeFile) onChangeFile(null, type);
    if (onDeleteImage && preview) {
      onDeleteImage(preview, type);
    }
  };

  const imagePreview = (src) => {
    const imgURL = typeof src === 'string' ? src : URL.createObjectURL(src);
    pop_open(
      <div className="p-4 justify-center flex">
        <img src={imgURL} className="max-w-full max-h-[80vh]" alt="" />
      </div>,
      "이미지 미리보기", false
    );
  }

  return (
    <>
      {cropImage && (
        <ImageCropModal
          image={cropImage}
          onCancel={() => setCropImage(null)}
          onConfirm={handleCropConfirm}
        />
      )}
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center h-8">
              {label && <label className="font-semibold text-sm opacity-70">{label}</label>}
              {preview && (
              <button
                  onClick={removeFile}
                  className="btn btn-sm font-semibold bg-red-400 text-white self-end"
              >
                  삭제
              </button>
              )}
          </div>

          <div
              className={`border-2 border-dashed rounded-lg p-4 min-h-[180px] cursor-pointer transition
                  flex justify-center
                  ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => imgInput.current.click()}
          >
              <input
                  ref={imgInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
              />

              {!preview ? (
                  <div className="flex items-center">
                      <p className="text-gray-500 w-full text-center">
                          클릭 또는 드래그하여<br/>이미지를 추가하세요
                      </p>
                  </div>
              ) : (
                  <img
                      src={preview.thumbURL}
                      loading="lazy"
                      decoding="async"
                      onClick={(e) => {
                          e.stopPropagation();
                          imagePreview(preview.origin);
                      }}
                      className="w-full object-cover rounded-md border cursor-pointer"
                      alt=""
                  />
              )}
          </div>
      </div>
    </>
  );
}