export interface UserIdentity {
  id: string;
  mspId: string;
}

export interface BaseCommand {
  name: string;
  payload: any;
}
