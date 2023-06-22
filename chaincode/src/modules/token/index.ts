import * as command from './type/command';

export const QueryCommandsNames = [
  'QueryToken'
];

export const CommandsNames = [
  'ImportToken',
];

// command types
export type CommandsPayloads =
  | command.TokenCommandPayload

export * from './type/command';

export * from './handler/tokenCommandHandlers';