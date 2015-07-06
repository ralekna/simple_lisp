/**
 * Created by rytis on 30/06/15.
 */

const OPERATORS = {
  '+' : function() {
    return Array.prototype.reduce.call(arguments, function(previous, item ){
      return previous + item;
    }, 0);
  },
  'quote': function (...args) {
    return args[0];
  }
};

function head(list) {
  if (!list.length) {
    throw new Error('Provided list is empty');
  }
  return list[0];
}

function tail(list) {
  if (list.length < 2) {
    throw new Error('Provided list does not have tail');
  }
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
      return (!isQuote(operator) && Array.isArray(arg)) ? evalAST(arg) : arg;
    }));
  } else {
    throw new Error(`Unknown operator [${operator}] occurred`);
  }
}