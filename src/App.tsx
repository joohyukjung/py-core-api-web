// src/App.tsx (완성본)
import { useState } from 'react'
import { useDraft } from '@/hooks/api/useDraft'
import { useDocument } from '@/hooks/api/useDocument'
import { downloadBlob } from '@/lib/utils/downloadBlob'
import { PromptForm } from '@/components/PromptForm'
import { DraftPreview } from '@/components/DraftPreview'
import { DocumentStatus } from '@/components/DocumentStatus'

function App() {
  const draft = useDraft()
  const document = useDocument()

  const [blob, setBlob] = useState<Blob | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleDraftSubmit = (prompt: string) => {
    setBlob(null)
    setFileName(null)
    draft.mutate({ prompt })
  }

  const handleConfirm = () => {
    if (!draft.data) return
    document.mutate(
      {
        title: draft.data.suggested_title,
        content: draft.data.content,
        format: 'docx',
      },
      {
        onSuccess: (data) => {
          setBlob(data)
          setFileName(`${draft.data!.suggested_title}.docx`)
        },
      },
    )
  }

  const handleReset = () => {
    draft.reset()
    document.reset()
    setBlob(null)
    setFileName(null)
  }

  return (
    <div className="mx-auto max-w-2xl p-6 flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Report Generator</h1>

      {!draft.data && <PromptForm onSubmit={handleDraftSubmit} isPending={draft.isPending} />}

      {draft.isError && (
        <p className="text-sm text-red-500">초안 생성에 실패했습니다: {draft.error.message}</p>
      )}

      {draft.data && !fileName && (
        <DraftPreview
          title={draft.data.suggested_title}
          content={draft.data.content}
          onConfirm={handleConfirm}
          onDiscard={handleReset}
          isGenerating={document.isPending}
        />
      )}

      {document.isError && (
        <p className="text-sm text-red-500">문서 생성에 실패했습니다: {document.error.message}</p>
      )}

      {(document.isPending || fileName) && (
        <DocumentStatus
          isPending={document.isPending}
          fileName={fileName}
          onDownload={() => blob && fileName && downloadBlob(blob, fileName)}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
