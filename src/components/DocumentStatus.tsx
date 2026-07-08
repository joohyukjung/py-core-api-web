// src/components/DocumentStatus.tsx
interface DocumentStatusProps {
  isPending: boolean
  fileName: string | null
  onDownload: () => void
  onReset: () => void
}

export function DocumentStatus({ isPending, fileName, onDownload, onReset }: DocumentStatusProps) {
  if (isPending) {
    return <p className="text-sm text-gray-500">생성중..</p>
  }

  if (fileName) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm">문서가 준비되었습니다: {fileName}</p>
        <div className="flex gap-2">
          <button onClick={onDownload} className="rounded bg-black text-white px-4 py-2">
            다운로드
          </button>
          <button onClick={onReset} className="rounded border px-4 py-2">
            새 리포트 작성
          </button>
        </div>
      </div>
    )
  }

  return null
}
