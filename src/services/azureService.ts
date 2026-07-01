import axios, { AxiosInstance } from 'axios';
import { FaceAnalysisResult } from '../types';

const AZURE_ENDPOINT = process.env.EXPO_PUBLIC_AZURE_ENDPOINT || '';
const AZURE_KEY = process.env.EXPO_PUBLIC_AZURE_KEY || '';

class AzureService {
  private static instance: AzureService;
  private api: AxiosInstance;

  private constructor() {
    if (!AZURE_ENDPOINT || !AZURE_KEY) {
      throw new Error('Azure credentials are not configured');
    }

    this.api = axios.create({
      baseURL: AZURE_ENDPOINT,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
      },
    });
  }

  public static getInstance(): AzureService {
    if (!AzureService.instance) {
      AzureService.instance = new AzureService();
    }
    return AzureService.instance;
  }

  public async analyzeFace(imageData: string): Promise<FaceAnalysisResult> {
    try {
      const response = await this.api.post('/face/v1.0/detect', imageData, {
        params: {
          returnFaceAttributes: 'facialHair,headPose',
        },
      });
      
      return this.processFaceAnalysis(response.data);
    } catch (error) {
      console.error('Face analysis failed:', error);
      throw error;
    }
  }

  private processFaceAnalysis(data: any): FaceAnalysisResult {
    return {
      faceShape: 'oval',
      confidence: 0.95,
      recommendations: []
    };
  }
}

export default AzureService.getInstance(); 