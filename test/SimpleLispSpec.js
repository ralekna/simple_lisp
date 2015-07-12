/**
 * Created by rytis on 06/07/15.
 */
import { evalAST, evalEntities, OPERATORS } from 'lib/SimpleLisp';

describe('Simple lisp', () => {
 /*
  describe('single sentence function calls', () => {

    it('should provide AST evaluation functionality', () => {
      expect(evalAST(['QUOTE', [true, false]])).toEqual([true, false]);
    });

    it('should return sum', () => {
      expect(evalAST(['PLUS', 2, 3])).toEqual(5);
    });

    it('should return cascaded sum', () => {
      expect(evalAST(['PLUS', 2, 3, ['PLUS', 5, 3, 3]])).toEqual(16);
    });

  })
*/
  describe('multi sentence evaluator', () => {

    var program = [
      [OPERATORS.PLUS, 2, 3],
      [OPERATORS.PLUS, 4, 3]
    ];

    it('should eval plain function', () => {
      expect(evalEntities(OPERATORS.PLUS, 2, 3)).toEqual(5);
    });


    it('should return last result', () => {
      console.log('in test')
      expect(evalEntities(program).toEqual(7));
    });

  });

});
