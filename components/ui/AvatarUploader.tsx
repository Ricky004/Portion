"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'


interface FileUplaodProps {
  onUpload: (file: File) => void
}

export const AvatarUploader = ({ onUpload }: FileUplaodProps) => {
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const validateFile = (file: File) => {
    if (file.size > 1024 * 1024 * 10) { // 10 MB max
      throw new Error('File size is too large. Maximum allowed is 10MB.')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setError(null)

      if (!acceptedFiles || acceptedFiles.length === 0) {
        setError("No file was uploaded.")
        return
      }

      try {
        const file = acceptedFiles[0]
        validateFile(file)
        onUpload(file)
        setPreviewImage(URL.createObjectURL(file))
      } catch (err) {
        setError("File is not uplaod")
      }
    }
  })

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}
        className=' bg-gray-200 h-28 flex justify-center items-center text-gray-600 rounded-lg text-sm'>
        <input {...getInputProps()} />
        {
          isDragActive ? (
            <p>Drop the avatar here ...</p>
          ) : (
            <p>Drag n drop your avatar here, or click to select avatar</p>
          )}
      </div>
      <div>
        {error && <p className="error">{error}</p>}
        {previewImage && (
        <div className='relative rounded-full w-16 h-16 overflow-hidden border-2 border-black'>
          <Image 
            className='rounded-full object-cover p-[0.15rem] pt-[0.15rem]'
            src={previewImage}
            fill={true}
            alt="Preview"
          />
        </div>
        )}
      </div>
    </>
  )
}