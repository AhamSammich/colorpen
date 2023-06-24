import {useEffect, useRef, useState} from "react";

const DropzoneComponent = () => {
    const dropzone = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        const currentDropzone = dropzone.current;
        if (!currentDropzone) return;
        const validateImage = (image) => {
            const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(image.type)) {
                alert(`Invalid file type. (Type: ${image.type})`);
                return false;
            }

            const maxSizeInBytes = 10e6; // 10MB
            if (image.size > maxSizeInBytes) {
                alert("File is too large.");
                return false;
            }

            return true;
        }

        const handleFile = file => {

            const readFile = (file) => {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    setImgSrc(ev.target.result);
                }
                reader.readAsDataURL(file)
            }

            if (validateImage(file)) readFile(file);
        };

        const handleDragEnter = ev => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsDragging(true)
            return false;
        };

        const handleDragLeave = ev => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsDragging(false)
            return false;
        };

        const handleDragOver = ev => {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        };

        const handleDrop = ev => {
            ev.preventDefault();
            ev.stopPropagation();
            setIsDragging(false)
            const {files} = ev.dataTransfer;
            handleFile(files[0]);
        };

        currentDropzone.addEventListener("dragenter", handleDragEnter)
        currentDropzone.addEventListener("dragleave", handleDragLeave)
        currentDropzone.addEventListener("dragover", handleDragOver)
        currentDropzone.addEventListener("drop", handleDrop)

        return () => {
            currentDropzone.removeEventListener("dragenter", handleDragEnter)
            currentDropzone.removeEventListener("dragleave", handleDragLeave)
            currentDropzone.removeEventListener("dragover", handleDragOver)
            currentDropzone.removeEventListener("drop", handleDrop)
        }

    }, [])

    return (
        <>
            <div ref={dropzone} className={`dropzone w-full h-[100px] mx-auto mb-2 ${isDragging ? 'dragging' : ''}`}>
                <span className="font-bold text-5xl">+</span>
                <h2>Drag and drop image here</h2>
            </div>
            <div className="w-[500px] h-[500px] overflow-hidden m-auto">
                {imgSrc && <img className="colorthief-target object-contain object-center" src={imgSrc} alt="image"
                                height="500" width="500" />}
            </div>
        </>
    )
};

export {
    DropzoneComponent,
}