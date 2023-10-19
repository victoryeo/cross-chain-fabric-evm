export type CommandTypes = 'ImportToken';

export interface Command {
  name: CommandTypes;
  payload: TokenCommandPayload;
}

export interface TokenCommandPayload {
  /**
   * A sequence of characters used to uniquely identify the resource.
   */
  identifier: string;
  name: string;
  symbol: string;
  faceValue: string;
  coupon: string;
  period: number;
}