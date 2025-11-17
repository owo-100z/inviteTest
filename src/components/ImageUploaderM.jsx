import React, { use, useEffect, useRef, useState } from "react";

export default function ImageUploaderM({ label, onChangeFiles, initImages = [], limit = 0 }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [prevImages, setPrevImages] = useState([]);

  const imgInput = useRef(null);

  useEffect(() => {
    if (initImages && initImages.length > 0) {
      setPreviews(initImages);
      setPrevImages(initImages);
    }
  }, [initImages]);

  // 파일 업데이트 + 중복 제거
  const updateFiles = (incomingFiles) => {
    const combined = [...files, ...incomingFiles];

    const unique = combined.filter(
      (file, idx, self) =>
        idx === self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    setFiles(unique);
    setPreviews([...previews, ...unique.map((file) => URL.createObjectURL(file))]);

    if (onChangeFiles) onChangeFiles(unique);
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (limit > 0 && previews.length + selected.length > limit) {
      alert(`이미지는 최대 ${limit}장까지 업로드 가능합니다.`);
      return;
    }
    if (selected.length) updateFiles(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const dropped = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (limit > 0 && previews.length + dropped.length > limit) {
      alert(`이미지는 최대 ${limit}장까지 업로드 가능합니다.`);
      return;
    }

    if (dropped.length) updateFiles(dropped);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));

    if (onChangeFiles) onChangeFiles(newFiles);
  };

  const resetAll = () => {
    setFiles([]);
    setPreviews([...prevImages]);
    imgInput.current.value = null;
    if (onChangeFiles) onChangeFiles([]);
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
    <>
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
        <div className="flex justify-between items-center h-8">
          {label && <label className="font-semibold text-sm opacity-70">{label}</label>}
          {files.length > 0 && (
            <button
              onClick={resetAll}
              className="btn btn-sm font-semibold bg-red-400 text-white self-end"
            >
              이미지 업로드 초기화
            </button>
        )}
        </div>

        {/* 드래그&드롭 + 미리보기 포함 박스 */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-4 min-h-[180px] cursor-pointer transition
            flex flex-wrap gap-3 items-start
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => imgInput.current.click()}
        >
          <input
            ref={imgInput}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {previews.length === 0 && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-500 w-full text-center">
                클릭 또는 드래그하여<br/>이미지를 추가하세요
              </p>
            </div>
          )}

          {/* 미리보기 이미지들 */}
          <div className={`grid ${limit > 0 && limit < 3 ? 'grid-cols-2' : 'grid-cols-3 md:grid-cols-5'} gap-3 w-full`}>
            {previews.map((src, i) => (
              <div key={i} className="relative w-full">
                <img
                  src={src}
                  className="w-full object-cover rounded-md border cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    imagePreview(src);
                  }}
                  alt=""
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}