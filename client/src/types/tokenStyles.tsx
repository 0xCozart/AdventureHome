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

export interface balanceObj {
  [tokens: string]: string[];
}

export type tokenDataObj = {
  [key in tokenName]: data;
};
