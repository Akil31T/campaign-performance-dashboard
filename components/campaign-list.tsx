"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CampaignListProps } from "@/lib/types"



export function CampaignList({ campaigns, selectedId, onSelect }: CampaignListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "paused":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {campaigns.map((campaign) => (
            <button
              key={campaign.id}
              onClick={() => onSelect(campaign)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                selectedId === campaign.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="font-medium text-sm truncate">{campaign.name}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
                <span className="text-xs text-muted-foreground capitalize">{campaign.platforms.join(", ")}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
