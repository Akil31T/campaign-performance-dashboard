
export interface CampaignInsights {
  timestamp: string
  impressions: number
  clicks: number
  conversions: number
  spend: number
  ctr: number
  cpc: number
  conversion_rate: number
}

export interface CampaignChartsProps {
  insights: CampaignInsights
}
export interface Campaign {
  id: string
  name: string
  status: string
  platforms: string[]
}

export interface CampaignListProps {
  campaigns: Campaign[]
  selectedId: string | null
  onSelect: (campaign: Campaign) => void
}

export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: string
  budget: number;
  daily_budget: number;
  platforms: string[];
}

export interface CampaignInsights {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}