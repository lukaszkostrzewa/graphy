import {Inject, Injectable} from '@angular/core';
import {Parser} from './parser';
import {GraphFormat} from '../../common/graph-format';

@Injectable()
export class ParserService {
  private parsersMap: { [key: string]: Parser } = {};

  constructor(@Inject(Parser) private parsers: Parser[]) {
    parsers.forEach(parser => this.parsersMap[parser.getGraphFormat().id] = parser);
  }

  get(parserName: string): Parser {
    return this.parsersMap[parserName];
  }

  getAvailableFormats(): GraphFormat[] {
    return this.parsers.map(parser => parser.getGraphFormat());
  }
}
