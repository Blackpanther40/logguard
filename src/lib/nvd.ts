import type { NvdCveItem, NvdResponse } from '../types/nvd'

const NVD_BASE =
  import.meta.env.DEV
    ? '/api/nvd'
    : 'https://services.nvd.nist.gov/rest/json/cves/2.0'

export async function searchCves(keyword: string): Promise<NvdCveItem[]> {
  const trimmed = keyword.trim()
  if (!trimmed) return []

  const params = new URLSearchParams({
    keywordSearch: trimmed,
    resultsPerPage: '20',
  })

  const response = await fetch(`${NVD_BASE}?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`NVD API error (${response.status})`)
  }

  const data = (await response.json()) as NvdResponse
  return data.vulnerabilities ?? []
}

export function getCveSeverity(item: NvdCveItem): {
  score: number | null
  label: string
} {
  const m = item.cve.metrics
  const v31 = m?.cvssMetricV31?.[0]?.cvssData
  if (v31) return { score: v31.baseScore, label: v31.baseSeverity }
  const v30 = m?.cvssMetricV30?.[0]?.cvssData
  if (v30) return { score: v30.baseScore, label: v30.baseSeverity }
  const v2 = m?.cvssMetricV2?.[0]?.cvssData
  if (v2) return { score: v2.baseScore, label: 'V2' }
  return { score: null, label: 'UNKNOWN' }
}

export function getCveDescription(item: NvdCveItem): string {
  const en = item.cve.descriptions?.find((d) => d.lang === 'en')
  return en?.value ?? item.cve.descriptions?.[0]?.value ?? 'No description available.'
}
