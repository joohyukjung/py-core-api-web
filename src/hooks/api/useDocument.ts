// src/hooks/api/useDocument.ts
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import type { components } from '@/lib/api/schema'

type ReportDocumentRequest = components['schemas']['ReportDocumentRequest']

export function useDocument() {
    return useMutation<Blob, Error, ReportDocumentRequest>({
        mutationFn: async (body) => {
            const { data, error } = await apiClient.POST('/v1/reports/document', {
                body,
                parseAs: 'blob',
            })

            if (error) throw new Error(JSON.stringify(error))
            if (!data) throw new Error('No document data returned')

            return data as Blob
        },
    })
}