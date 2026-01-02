"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Campaign {
  id: string
  name: string
  budget: number
  daily_budget: number
}

interface CampaignInsights {
  impressions: number
  clicks: number
  conversions: number
  spend: number
  ctr: number
  cpc: number
  conversion_rate: number
}

interface CampaignMetricsProps {
  campaign: Campaign
  insights: CampaignInsights
}

export function CampaignMetrics({ campaign, insights }: CampaignMetricsProps) {
  const budgetRemaining = campaign.budget - insights.spend
  const budgetPercentage = (insights.spend / campaign.budget) * 100

  const metrics = [
    {
      label: "Spend",
      value: `$${insights.spend.toFixed(2)}`,
      subtext: `of $${campaign.budget}`,
    },
    {
      label: "Impressions",
      value: insights.impressions.toLocaleString(),
    },
    {
      label: "Clicks",
      value: insights.clicks.toLocaleString(),
    },
    {
      label: "Conversions",
      value: insights.conversions.toLocaleString(),
    },
    {
      label: "CTR",
      value: `${insights.ctr.toFixed(2)}%`,
    },
    {
      label: "CPC",
      value: `$${insights.cpc.toFixed(2)}`,
    },
    {
      label: "Conversion Rate",
      value: `${insights.conversion_rate.toFixed(2)}%`,
    },
    {
      label: "ROAS",
      value: `${((insights.conversions * 100) / insights.spend).toFixed(2)}`,
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{campaign.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Budget Spent</span>
              <span className="font-medium">
                ${insights.spend.toFixed(2)} / ${campaign.budget}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-lime-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              {budgetPercentage.toFixed(1)}% spent • ${budgetRemaining.toFixed(2)} remaining
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-lg font-bold">{metric.value}</div>
              {metric.subtext && <div className="text-xs text-muted-foreground mt-1">{metric.subtext}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
