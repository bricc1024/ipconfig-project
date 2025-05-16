import { PrimaryStream } from './primary-stream.model';

export interface Camera {
  active: boolean;
  href: string;
  id: number;
  name: string;
  retention: number;
  configuration: any;
  capabilities: any;
  primaryStream: PrimaryStream;
  defaultViewStreamId: number;
  secondaryStreams: any;
  server: any;
  streams: any;
  connectionUri: string;
  driver: string;
  features: any;
  tags: any;
}
