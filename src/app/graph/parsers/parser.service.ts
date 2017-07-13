import {Inject, Injectable} from '@angular/core';
import {Parser} from './parser';

@Injectable()
export class ParserService {
  private parsers: { [key: string]: Parser } = {};

  constructor(@Inject(Parser) parsers: Parser[]) {
    parsers.forEach(parser => this.parsers[parser.id()] = parser);
  }

  get(parserName: string): Parser {
    return this.parsers[parserName];
  }
}
