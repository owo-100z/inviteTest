import React, { useEffect, useRef, useState } from "react";

export default function ImageUploaderSingle({ label, onChangeFile, initImage = null, onDeleteImage, type }) {
  const [file, setFile] = useState(null); // 단일 파일
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const imgInput = useRef(null);

  useEffect(() => {
    if (initImage) {
      setPreview(initImage);
    }
  }, [initImage]);

  const updateFile = (incomingFile) => {
    if (!incomingFile) return;

    setFile(incomingFile);
    setPreview(URL.createObjectURL(incomingFile));

    if (onChangeFile) onChangeFile(incomingFile, type);
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      updateFile(selected);
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
      updateFile(dropped);
    }
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
    pop_open(
      <div className="p-4 justify-center flex">
        <img src={src} className="max-w-full max-h-[80vh]" alt="" />
      </div>,
      "이미지 미리보기", false
    );
  }

  return (
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
                    src={preview}
                    onClick={(e) => {
                        e.stopPropagation();
                        imagePreview(preview);
                    }}
                    className="w-full object-cover rounded-md border cursor-pointer"
                    alt=""
                />
            )}
        </div>
    </div>
  );
}