import { useRef, useState } from 'react'
import { FiImage, FiTrash2, FiUploadCloud, FiX } from 'react-icons/fi'
import { adminUploadService } from '../../../services/adminUploadService'

const ImageUpload = ({
    label = 'Upload Image',
    folder = 'general',
    value = '',
    values = [],
    multiple = false,
    onUpload,
    onUploadMultiple,
    onRemove,
    onRemoveItem,
}) => {
    const inputRef = useRef(null)

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')

    const handleUpload = async (e) => {
        const selectedFiles = Array.from(e.target.files || [])

        if (selectedFiles.length === 0) return

        const invalidFile = selectedFiles.find((file) => !file.type.startsWith('image/'))

        if (invalidFile) {
            setError('Only image files are allowed.')
            return
        }

        const largeFile = selectedFiles.find((file) => file.size > 5 * 1024 * 1024)

        if (largeFile) {
            setError('Image size must be less than 5MB.')
            return
        }

        try {
            setUploading(true)
            setError('')

            if (multiple) {
                const response = await adminUploadService.uploadMultiple(
                    selectedFiles,
                    folder
                )

                const urls = response.files.map((file) => file.url)

                if (onUploadMultiple) {
                    onUploadMultiple(urls)
                }
            } else {
                const response = await adminUploadService.uploadSingle(
                    selectedFiles[0],
                    folder
                )

                if (onUpload) {
                    onUpload(response.file.url)
                }
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                'Image upload failed. Please try again.'
            )
        } finally {
            setUploading(false)

            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const previewImages = multiple ? values : value ? [value] : []

    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-dark">{label}</label>

            <div className="rounded-3xl border border-dashed border-border bg-soft p-5">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    onChange={handleUpload}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full flex-col items-center justify-center rounded-2xl bg-white px-5 py-8 text-center transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <FiUploadCloud className="text-primary" size={34} />

                    <span className="mt-3 text-sm font-black text-dark">
                        {uploading ? 'Uploading...' : multiple ? 'Upload Images' : 'Upload Image'}
                    </span>

                    <span className="mt-1 text-xs leading-6 text-muted">
                        PNG, JPG, WEBP, GIF. Max file size 5MB.
                    </span>
                </button>

                {error && (
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        {error}
                    </div>
                )}

                {previewImages.length > 0 && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {previewImages.map((imageUrl) => (
                            <div
                                key={imageUrl}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-white"
                            >
                                <img
                                    src={imageUrl}
                                    alt="Uploaded preview"
                                    className="h-40 w-full object-cover"
                                />

                                <div className="absolute inset-0 flex items-center justify-center bg-dark/40 opacity-0 transition group-hover:opacity-100">
                                    {multiple ? (
                                        <button
                                            type="button"
                                            onClick={() => onRemoveItem && onRemoveItem(imageUrl)}
                                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={onRemove}
                                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white"
                                        >
                                            <FiX />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {previewImages.length === 0 && (
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-muted">
                        <FiImage className="text-primary" />
                        No image uploaded yet.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImageUpload