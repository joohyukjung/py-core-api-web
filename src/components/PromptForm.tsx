// src/components/PromptForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  prompt: z.string().min(1, '프롬프트를 입력해주세요'),
})

type FormValues = z.infer<typeof schema>

interface PromptFormProps {
  onSubmit: (prompt: string) => void
  isPending: boolean
}

export function PromptForm({ onSubmit, isPending }: PromptFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values.prompt))}
      className="flex flex-col gap-3"
    >
      <textarea
        {...register('prompt')}
        rows={5}
        placeholder="어떤 리포트를 작성할까요?"
        className="border rounded p-3 resize-none"
        disabled={isPending}
      />
      {errors.prompt && <p className="text-sm text-red-500">{errors.prompt.message}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {isPending ? '작성 중...' : '리포트 생성'}
      </button>
    </form>
  )
}
