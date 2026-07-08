// src/components/DraftPreview.tsx
interface DraftPreviewProps {
  title: string
  content: string
  onConfirm: () => void
  onDiscard: () => void
  isGenerating: boolean
}

export function DraftPreview({
  title,
  content,
  onConfirm,
  onDiscard,
  isGenerating,
}: DraftPreviewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-medium mb-1">{title}</h2>
        <pre className="whitespace-pre-wrap border rounded p-4 text-sm">{content}</pre>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={isGenerating}
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-50"
        >
          {isGenerating ? '생성 중...' : '이 내용으로 docx 만들기'}
        </button>
        <button onClick={onDiscard} disabled={isGenerating} className="rounded border px-4 py-2">
          다시 작성
        </button>
      </div>
    </div>
  )
}
