export interface data {
  ticker: string;
  address: string;
  link: string;
}

export enum tokenName {
  dunkonyou,
  fishclub,
  ginandjuice,
  jolene,
  sonnet,
}

export type tokenDataObj = {
  [key in tokenName]: data;
};
