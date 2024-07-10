// types/ExtendedNextApiResponse.ts
import { NextApiResponse } from 'next';
import { InitDataParsed } from '@telegram-apps/init-data-node';

export interface ExtendedNextApiResponse extends NextApiResponse {
  locals?: {
    initData?: InitDataParsed;
  };
}



