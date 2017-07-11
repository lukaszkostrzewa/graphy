import {FirstLetterPipe} from './first-letter.pipe';

fdescribe('FirstLetterPipe', () => {
  it('should return empty string for null', () => {
    const pipe = new FirstLetterPipe();
    const val = pipe.transform(null);
    expect(val).toEqual('');
  });

  it('should return empty string for undefined', () => {
    const pipe = new FirstLetterPipe();
    const val = pipe.transform(undefined);
    expect(val).toEqual('');
  });

  it('should return empty string for empty string', () => {
    const pipe = new FirstLetterPipe();
    const val = pipe.transform('');
    expect(val).toEqual('');
  });

  it('should return first letter for non-empty string', () => {
    const pipe = new FirstLetterPipe();
    const val = pipe.transform('John Doe');
    expect(val).toEqual('J');
  });
});
