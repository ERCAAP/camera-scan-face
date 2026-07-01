// React Native Animatable için tip tanımlaması
declare module 'react-native-animatable' {
  import { ViewProps, TextProps, ImageProps } from 'react-native';
  
  export interface AnimatableProperties {
    animation?: string;
    duration?: number;
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    easing?: string;
    iterationCount?: number | 'infinite';
    useNativeDriver?: boolean;
  }

  export interface AnimatableViewProps extends ViewProps, AnimatableProperties {}
  export interface AnimatableTextProps extends TextProps, AnimatableProperties {}
  export interface AnimatableImageProps extends ImageProps, AnimatableProperties {}

  export class View extends React.Component<AnimatableViewProps> {}
  export class Text extends React.Component<AnimatableTextProps> {}
  export class Image extends React.Component<AnimatableImageProps> {}
}

// Expo Linear Gradient için tip tanımlaması
declare module 'expo-linear-gradient' {
  import { ViewProps } from 'react-native';
  
  export interface LinearGradientProps extends ViewProps {
    colors: string[];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}
}

// Axios için tip tanımlaması
declare module 'axios' {
  export interface AxiosRequestConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
  }

  export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig;
  }

  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }

  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

declare module 'expo-camera' {
  import { ViewProps } from 'react-native';
  
  export interface CameraProps extends ViewProps {
    type?: 'front' | 'back';
    onCameraReady?: () => void;
    ref?: (ref: any) => void;
  }

  export class Camera extends React.Component<CameraProps> {
    static requestCameraPermissionsAsync(): { status: any; } | PromiseLike<{ status: any; }> {
      throw new Error('Method not implemented.');
    }
    takePictureAsync(options?: {
      quality?: number;
      base64?: boolean;
    }): Promise<{
      uri: string;
      width: number;
      height: number;
      base64?: string;
    }>;
  }

  export function requestCameraPermissionsAsync(): Promise<{
    status: 'granted' | 'denied';
  }>;
} 