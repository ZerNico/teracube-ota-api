export enum JwtTypes {
  ApiToken = 'apiToken',
  LoginToken = 'loginToken',
}

export interface ApiTokenPayload {
  sub: string;
  type: JwtTypes;
}
