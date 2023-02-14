export interface ITrade { 
    id : string;
    data : {
      account: string,
      action: string,
      blockNumber: number,
      params: TParams,
      txhash: string
    };
    
   } 

  export type TParams = {
    acceptablePrice: string;
    collateralDelta: string;
    indexToken: string;
    isLong: boolean;
    sizeDelta: string
  }