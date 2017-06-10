'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _fill2 = require('lodash/fill');

var _fill3 = _interopRequireDefault(_fill2);

var _typeof = typeof Symbol === 'function' &&
  typeof Symbol.iterator === 'symbol'
  ? function(obj) {
      return typeof obj;
    }
  : function(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };

exports.default = reactElementToJSXString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _stringifyObject = require('stringify-object');

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _sortobject = require('sortobject');

var _sortobject2 = _interopRequireDefault(_sortobject);

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var escape = function escape(s) {
  return s.replace(/"/g, '&quot;');
};
var defaultFunctionValue = function defaultFunctionValue(fn) {
  return fn;
};

function reactElementToJSXString(ReactElement) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined
    ? arguments[1]
    : {},
    displayName = _ref.displayName,
    _ref$filterProps = _ref.filterProps,
    filterProps = _ref$filterProps === undefined ? [] : _ref$filterProps,
    _ref$showDefaultProps = _ref.showDefaultProps,
    showDefaultProps = _ref$showDefaultProps === undefined
      ? true
      : _ref$showDefaultProps,
    _ref$showFunctions = _ref.showFunctions,
    showFunctions = _ref$showFunctions === undefined
      ? false
      : _ref$showFunctions,
    _ref$functionValue = _ref.functionValue,
    functionValue = _ref$functionValue === undefined
      ? defaultFunctionValue
      : _ref$functionValue,
    _ref$tabStop = _ref.tabStop,
    tabStop = _ref$tabStop === undefined ? 2 : _ref$tabStop,
    _ref$useBooleanShorth = _ref.useBooleanShorthandSyntax,
    useBooleanShorthandSyntax = _ref$useBooleanShorth === undefined
      ? true
      : _ref$useBooleanShorth,
    maxInlineAttributesLineLength = _ref.maxInlineAttributesLineLength;

  var getDisplayName = displayName || getDefaultDisplayName;

  return toJSXString({ ReactElement: ReactElement });

  function toJSXString(_ref2) {
    var _ref2$ReactElement = _ref2.ReactElement,
      Element = _ref2$ReactElement === undefined ? null : _ref2$ReactElement,
      _ref2$lvl = _ref2.lvl,
      lvl = _ref2$lvl === undefined ? 0 : _ref2$lvl,
      _ref2$inline = _ref2.inline,
      inline = _ref2$inline === undefined ? false : _ref2$inline;

    if (typeof Element === 'string' || typeof Element === 'number') {
      return Element;
    } else if (!(0, _react.isValidElement)(Element)) {
      throw new Error(
        'react-element-to-jsx-string: Expected a ReactElement,\ngot `' +
          (typeof Element === 'undefined' ? 'undefined' : _typeof(Element)) +
          '`'
      );
    }

    var tagName = getDisplayName(Element);

    var out = '<' + tagName;
    var props = formatProps(
      Element.props,
      getDefaultProps(Element),
      inline,
      lvl
    );
    var attributes = [];
    var children = _react2.default.Children
      .toArray(Element.props.children)
      .filter(onlyMeaningfulChildren);

    if (Element.ref !== null) {
      attributes.push(getJSXAttribute('ref', Element.ref, inline, lvl));
    }

    if (
      Element.key !== null &&
      // React automatically add key=".X" when there are some children
      !/^\./.test(Element.key)
    ) {
      attributes.push(getJSXAttribute('key', Element.key, inline, lvl));
    }

    attributes = attributes.concat(props).filter(function(_ref3) {
      var name = _ref3.name;
      return filterProps.indexOf(name) === -1;
    });

    var outMultilineAttr = out;
    var outInlineAttr = out;
    var containsMultilineAttr = false;
    attributes.forEach(function(attribute) {
      var isMultilineAttr = false;
      if (['plainObject', 'array', 'function'].indexOf(attribute.type) > -1) {
        isMultilineAttr = attribute.value.indexOf('\n') > -1;
      }

      if (isMultilineAttr) {
        containsMultilineAttr = true;
      }

      outInlineAttr += ' ';
      outMultilineAttr += '\n' + spacer(lvl + 1, tabStop);

      if (useBooleanShorthandSyntax && attribute.value === '{true}') {
        outInlineAttr += '' + attribute.name;
        outMultilineAttr += '' + attribute.name;
      } else {
        outInlineAttr += attribute.name + '=' + attribute.value;
        outMultilineAttr += attribute.name + '=' + attribute.value;
      }
    });

    outMultilineAttr += '\n' + spacer(lvl, tabStop);

    if (
      shouldRenderMultilineAttr(
        attributes,
        outInlineAttr,
        containsMultilineAttr,
        inline,
        lvl
      )
    ) {
      out = outMultilineAttr;
    } else {
      out = outInlineAttr;
    }

    if (children.length > 0) {
      out += '>';
      lvl++;
      if (!inline) {
        out += '\n';
        out += spacer(lvl, tabStop);
      }

      if (typeof children === 'string') {
        out += children;
      } else {
        out += children
          .reduce(mergePlainStringChildren, [])
          .map(recurse({ lvl: lvl, inline: inline }))
          .join('\n' + spacer(lvl, tabStop));
      }
      if (!inline) {
        out += '\n';
        out += spacer(lvl - 1, tabStop);
      }
      out += '</' + tagName + '>';
    } else {
      if (!isInlineAttributeTooLong(attributes, outInlineAttr, lvl)) {
        out += ' ';
      }

      out += '/>';
    }

    return out;
  }

  function shouldRenderMultilineAttr(
    attributes,
    inlineAttributeString,
    containsMultilineAttr,
    inline,
    lvl
  ) {
    return (
      (isInlineAttributeTooLong(attributes, inlineAttributeString, lvl) ||
        containsMultilineAttr) &&
      !inline
    );
  }

  function isInlineAttributeTooLong(attributes, inlineAttributeString, lvl) {
    if (typeof maxInlineAttributesLineLength === 'undefined') {
      // For backwards compatibility, if the new option is undefined, use previous logic to determine
      // whether or not to render multiline attributes based on the number of attributes
      return attributes.length > 1;
    } else {
      return (
        spacer(lvl, tabStop).length + inlineAttributeString.length >
        maxInlineAttributesLineLength
      );
    }
  }

  function formatProps(props, defaultProps, inline, lvl) {
    var formatted = Object.keys(props).filter(noChildren);

    if (useBooleanShorthandSyntax) {
      formatted = formatted.filter(function(key) {
        return noFalse(props[key], defaultProps[key]);
      });
    }

    if (!showDefaultProps) {
      formatted = formatted.filter(function(key) {
        return typeof defaultProps[key] === 'undefined'
          ? typeof props[key] !== 'undefined'
          : defaultProps[key] !== props[key];
      });
    }

    return formatted.sort().map(function(propName) {
      return getJSXAttribute(propName, props[propName], inline, lvl);
    });
  }

  function getJSXAttribute(name, value, inline, lvl) {
    return {
      name: name,
      type: getValueType(value),
      value: formatJSXAttribute(value, inline, lvl)
        .replace(/'?<__reactElementToJSXString__Wrapper__>/g, '')
        .replace(/<\/__reactElementToJSXString__Wrapper__>'?/g, ''),
    };
  }

  function formatJSXAttribute(propValue, inline, lvl) {
    if (typeof propValue === 'string') {
      return '"' + escape(propValue) + '"';
    }

    if (
      (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) ===
      'symbol'
    ) {
      return '{' + propValue.toString() + '}';
    }

    return '{' + formatValue(propValue, inline, lvl) + '}';
  }

  function getValueType(value) {
    if ((0, _react.isValidElement)(value)) {
      return 'element';
    }

    if ((0, _isPlainObject2.default)(value)) {
      return 'plainObject';
    }

    if (Array.isArray(value)) {
      return 'array';
    }

    return typeof value === 'undefined' ? 'undefined' : _typeof(value);
  }

  function isFunction(value) {
    return typeof value === 'function';
  }

  function formatValue(value, inline, lvl) {
    var wrapper = '__reactElementToJSXString__Wrapper__';
    if (isFunction(value)) {
      return functionValue(
        showFunctions === false && functionValue === defaultFunctionValue
          ? function noRefCheck() {} // eslint-disable-line prefer-arrow-callback
          : value
      );
    }

    if ((0, _react.isValidElement)(value)) {
      // we use this delimiter hack in cases where the react element is a property
      // of an object from a root prop
      // i.e.
      //   reactElementToJSXString(<div a={{b: <div />}} />
      //   // <div a={{b: <div />}} />
      // we then remove the whole wrapping
      // otherwise, the element would be surrounded by quotes: <div a={{b: '<div />'}} />
      return (
        '<' +
        wrapper +
        '>' +
        toJSXString({
          ReactElement: value,
          inline: true,
        }) +
        '</' +
        wrapper +
        '>'
      );
    } else if ((0, _isPlainObject2.default)(value) || Array.isArray(value)) {
      return (
        '<' +
        wrapper +
        '>' +
        stringifyObject(value, inline, lvl) +
        '</' +
        wrapper +
        '>'
      );
    }

    return value;
  }

  function recurse(_ref4) {
    var lvl = _ref4.lvl, inline = _ref4.inline;

    return function(Element) {
      return toJSXString({ ReactElement: Element, lvl: lvl, inline: inline });
    };
  }

  function stringifyObject(obj, inline, lvl) {
    if (Object.keys(obj).length > 0 || obj.length > 0) {
      // eslint-disable-next-line array-callback-return
      obj = (0, _traverse2.default)(obj).map(function(value) {
        if ((0, _react.isValidElement)(value) || this.isLeaf) {
          this.update(formatValue(value, inline, lvl));
        }
      });

      obj = (0, _sortobject2.default)(obj);
    }

    var stringified = (0, _stringifyObject2.default)(obj);

    if (inline) {
      return (0, _collapseWhiteSpace2.default)(stringified)
        .replace(/{ /g, '{')
        .replace(/ }/g, '}')
        .replace(/\[ /g, '[')
        .replace(/ ]/g, ']');
    }

    // Replace tabs with spaces, and add necessary indentation in front of each new line
    return stringified
      .replace(/\\\'/g, "'")
      .replace(/\t/g, spacer(1, tabStop))
      .replace(/\n([^$])/g, '\n' + spacer(lvl + 1, tabStop) + '$1');
  }
}

function getDefaultDisplayName(ReactElement) {
  return (
    ReactElement.type.displayName ||
    ReactElement.type.name || // function name
    (typeof ReactElement.type === 'function' // function without a name, you should provide one
      ? 'No Display Name'
      : ReactElement.type)
  );
}

function getDefaultProps(ReactElement) {
  return ReactElement.type.defaultProps || {};
}

function mergePlainStringChildren(prev, cur) {
  var lastItem = prev[prev.length - 1];

  if (typeof cur === 'number') {
    cur = String(cur);
  }

  if (typeof lastItem === 'string' && typeof cur === 'string') {
    prev[prev.length - 1] += cur;
  } else {
    prev.push(cur);
  }

  return prev;
}

function spacer(times, tabStop) {
  return times === 0
    ? ''
    : (0, _fill3.default)(new Array(times * tabStop), ' ').join('');
}

function noChildren(propName) {
  return propName !== 'children';
}

function noFalse(propValue, defaultValue) {
  return typeof propValue !== 'boolean' || propValue || Boolean(defaultValue);
}

function onlyMeaningfulChildren(children) {
  return (
    children !== true &&
    children !== false &&
    children !== null &&
    children !== ''
  );
}
