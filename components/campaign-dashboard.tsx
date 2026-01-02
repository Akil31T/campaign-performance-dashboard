"use client";

import { useEffect, useState } from "react";
import { CampaignList } from "./campaign-list";
import { CampaignMetrics } from "./campaign-metrics";
import { CampaignCharts } from "./campaign-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import apiCall from "@/lib/api";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constant";
import { Campaign, CampaignInsights } from "@/lib/types";


export function CampaignDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [insights, setInsights] = useState<CampaignInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch campaigns on mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response =  await apiCall(API_ENDPOINTS.CAMPAIGNS, "GET");
        setCampaigns(response.campaigns);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Fetch insights for selected campaign
  useEffect(() => {
    if (!selectedCampaign) return;

    const fetchInsights = async () => {
      try {
         const response = await apiCall(
          `${API_ENDPOINTS.CAMPAIGNS}/${selectedCampaign.id}/insights`,
          "GET"
        );
        console.log(response.insights, 'rses');
        setInsights(response.insights);
      } catch (err) {
        console.error("Error fetching insights:", err);
      }
    };

    fetchInsights();

    
    // Set up streaming for real-time updates
    const eventSource = new EventSource(
      `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGNS}/${selectedCampaign.id}/insights/stream`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setInsights(data);
      } catch (err) {
        console.error("Error parsing stream data:", err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [selectedCampaign]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Campaign Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor performance across all campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <CampaignList
            campaigns={campaigns}
            selectedId={selectedCampaign?.id || null}
            onSelect={(campaign) => {
              const fullCampaign = campaigns.find((c) => c.id === campaign.id);
              setSelectedCampaign(fullCampaign ?? null);
            }}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {selectedCampaign && insights && (
            <>
              <CampaignMetrics
                campaign={selectedCampaign}
                insights={insights}
              />
              <CampaignCharts insights={insights} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
