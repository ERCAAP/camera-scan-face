export interface FaceAnalysisResult {
  faceShape: string;
  confidence: number;
  recommendations: HaircutRecommendation[];
}

export interface HaircutRecommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
} 