"use 6to5";
/**
 * Created by rytis on 30/06/15.
 */

export const OPERATORS = {
  PLUS : function() {
    return Array.prototype.reduce.call(arguments, function(previous, item ){
      return previous + this.EVAL(item);
    }, 0);
  },
  QUOTE: function (arg) {
    return arg;
  },
  EVAL: evalEntities
};

const TOKENS = {
  LPAREN: '(',
  RPAREN: ')',
  QUOTE: '`'
};



function head(list) {
  if (!list.length) {
    throw new Error('Provided list is empty');
  }
  return list[0];
}

function tail(list) {
  return list.slice(1);
}

function isKeyword(value) {
  return value in OPERATORS;
}

function isQuote(value) {
  return value === 'quote' || value === '\'';
}

export function evalAST(tree) {
  let operator      = head(tree);
  let operands      = tail(tree);

  if (operator in OPERATORS) {
    return OPERATORS[operator].apply(null, operands.map((arg) => {
      return (!isQuote(operator)) ? evalAST(arg) : arg;
    }));
  } else {
    throw new Error(`Unknown operator [${operator}] occurred`);
  }
}

export function evalEntities(...entities) {
  let fst = head(entities);
  switch (true) {
    case typeof fst == 'function':
      return fst.apply(null, tail(entities));
    case entities.length == 1 && Array.isArray(fst):
      return evalEntities(fst);
    case entities.length > 1:
      return entities.reduce(evalEntities, null);
    default:
      return fst;
  }
}

function evalDirectTree(tree) {

  let operator      = head(tree);
  let operands      = tail(tree);

  if (typeof operator !== 'function') {
    throw new Error('Operator is not a function');
  }

  return operator.apply(null, operands.map((arg) => {
    return ((OPERATORS.quote != operator)) ? evalAST(arg) : arg;
  }));

}
