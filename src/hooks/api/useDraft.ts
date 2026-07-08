// src/hooks/api/useDraft.ts
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'

type ReportDraftRequest = components['schemas']['ReportDraftRequest']
type ReportDraftResponse = components['schemas']['ReportDraftResponse']

export function useDraft() {
  return useMutation<ReportDraftResponse, Error, ReportDraftRequest>({
    mutationFn: async (body) => {
      const { data, error } = await apiClient.POST('/v1/reports/draft', { body })
      if (error) throw new Error(JSON.stringify(error))
      return data
    },
  })
}
