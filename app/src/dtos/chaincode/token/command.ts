export type CommandTypes = 'ImportToken';

export interface Command {
  name: CommandTypes;
  payload: TokenCommandPayload;
}

export interface TokenCommandPayload {
  name: string;
  symbol: string;
  faceValue: string;
  coupon: string;
  period: number;
}