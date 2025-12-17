import React, { use, useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

export default function ImageUploaderM({ label, onChangeFiles, initImages = [], limit = 0, onDeleteImage, type }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadText, setUploadText] = useState("이미지 등록 중...");

  const [prevImages, setPrevImages] = useState([]);

  const imgInput = useRef(null);

  useEffect(() => {
    if (initImages && initImages.length > 0) {
      const thumbs = initImages.map((img) => ({
        origin: img,
        thumbURL: img.replace(/(\.\w+)?$/, '_thumb$1') // 썸네일 URL 생성 로직 예시
      }));

      setPreviews(thumbs);
      setPrevImages(thumbs);
    }
  }, [initImages]);

  // 파일 업데이트 + 중복 제거
  const updateFiles = async (incomingFiles) => {
    const combined = [...files, ...incomingFiles];

    const unique = combined.filter(
      (file, idx, self) =>
        idx === self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    const uploadingFiles = incomingFiles.filter(file =>
      !files.some(f => f.name === file.name && f.size === file.size)
    );

    const uploadingCount = uploadingFiles.length;

    setUploadText(`이미지 ${uploadingCount}개 등록 중...`);

    setImageUploading(true);
    setUploadProgress(0);

    for (let i=0; i<uploadingFiles.length; i++) {
      const thumb = await makePreviews(uploadingFiles[i], uploadingCount);
      setPreviews((prev) => [...prev, thumb]);
    }
    setImageUploading(false);

    setFiles(unique);

    if (onChangeFiles) onChangeFiles(unique, type);
  };

  // 이미지 preview 만들기
  const makePreviews = async (file, uploadingFiles) => {
    const thumb = await imageCompression(file, {
      maxWidthOrHeight: 300,
      initialQuality: 0.7,
      useWebWorker: true,
    })

    const thumbURL = URL.createObjectURL(thumb);

    setUploadProgress((prev) => prev + (100 / uploadingFiles));

    return {
      origin: file,
      thumbURL: thumbURL
    }
  }

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

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);

    if (onChangeFiles) onChangeFiles(newFiles, type);
    if (onDeleteImage) {
      const prevImage = prevImages.find(img => img.origin === previews[index].origin);
      if (prevImage) {
        onDeleteImage(prevImage.origin, type);
        setPrevImages(prevImages.filter(img => img.origin !== previews[index].origin));
      }
    }
  };

  const resetAll = () => {
    setFiles([]);
    if (prevImages.length > 0) {
      if (confirm('기존 이미지도 모두 삭제하시겠습니까?')) {
        prevImages.forEach(img => {
          if (onDeleteImage) {
            setTimeout(() => {
              onDeleteImage(img, type);
            }, 0);
          }
        });
        setPrevImages([]);
        setPreviews([]);
      } else {
        setPreviews([...prevImages]);
      }
    } else {
      setPreviews([]);
    }
    imgInput.current.value = null;
    if (onChangeFiles) onChangeFiles([], type);
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
      {imageUploading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                  <p className="mb-4 font-semibold">{uploadText}</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                      <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <p>{Math.round(uploadProgress)}%</p>
              </div>
          </div>
      )}
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
        <div className="flex justify-between items-center h-8">
          {label && <label className="font-semibold text-sm opacity-70">{label}</label>}
          {previews.length > 0 && (
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
                  src={src.thumbURL}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover rounded-md border cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    imagePreview(src.origin);
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