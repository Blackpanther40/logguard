export interface NvdCveItem {
  cve: {
    id: string
    descriptions?: { lang: string; value: string }[]
    metrics?: {
      cvssMetricV31?: { cvssData: { baseScore: number; baseSeverity: string } }[]
      cvssMetricV30?: { cvssData: { baseScore: number; baseSeverity: string } }[]
      cvssMetricV2?: { cvssData: { baseScore: number } }[]
    }
    published?: string
  }
}

export interface NvdResponse {
  totalResults?: number
  vulnerabilities?: NvdCveItem[]
}
