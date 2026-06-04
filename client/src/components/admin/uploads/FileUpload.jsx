import { useRef, useState } from 'react'
import { FiFileText, FiTrash2, FiUploadCloud } from 'react-icons/fi'
import { adminUploadService } from '../../../services/adminUploadService'

const FileUpload = ({
  label = 'Upload File',
  folder = 'general',
  value = '',
  accept = 'application/pdf',
  helperText = 'PDF file. Max file size 10MB.',
  onUpload,
  onRemove,
}) => {
  const inputRef = useRef(null)

  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async (e) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (accept === 'application/pdf' && selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed.')
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.')
      return
    }

    try {
      setUploading(true)
      setError('')

      const response = await adminUploadService.uploadSingle(
        selectedFile,
        folder
      )

      if (onUpload) {
        onUpload(response.file.url)
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'File upload failed. Please try again.'
      )
    } finally {
      setUploading(false)

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-dark">{label}</label>

      <div className="rounded-3xl border border-dashed border-border bg-soft p-5">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
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
            {uploading ? 'Uploading...' : 'Upload CV'}
          </span>

          <span className="mt-1 text-xs leading-6 text-muted">{helperText}</span>
        </button>

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {value ? (
          <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 text-sm text-muted">
            <div className="flex min-w-0 items-center gap-3">
              <FiFileText className="shrink-0 text-primary" />
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="truncate font-semibold text-primary"
              >
                Uploaded CV
              </a>
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              <FiTrash2 />
            </button>
          </div>
        ) : (
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-muted">
            <FiFileText className="text-primary" />
            No CV uploaded yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload
