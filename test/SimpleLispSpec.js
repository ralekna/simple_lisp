/**
 * Created by rytis on 06/07/15.
 */
import { evalAST } from 'lib/SimpleLisp';

describe('Simple lisp', () => {
  it('should provide AST evaluation functionality', () => {
    expect(evalAST(['quote', [true, false]])).toEqual([true, false]);
  });

  it('should return sum', () => {
    expect(evalAST(['+', 2, 3])).toEqual(5);
  });

  it('should return cascaded sum', () => {
    expect(evalAST(['+', 2, 3, ['+', 5, 3, 3]])).toEqual(16);
  });

});