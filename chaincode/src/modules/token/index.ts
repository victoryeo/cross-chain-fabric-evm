import * as command from './type/command';
import * as query from './type/query';

export const QueryCommandsNames = [
  'QueryToken'
];

export const CommandsNames = [
  'ImportToken',
];

// command types
export type CommandsPayloads =
  | command.TokenCommandPayload

export type QueryCommandsPayloads =
  | query.QueryGenericPayload

export * from './type/command';
export * from './type/query';

export * from './handler/tokenCommandHandlers';