export interface Parser {

  canParse(content: string): boolean
  parse(content: string): void
}
