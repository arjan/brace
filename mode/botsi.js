ace.define("ace/mode/botsi_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
  "use strict";

  var oop = acequire("../lib/oop");
  var TextHighlightRules = ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules;

  // exports is for Haml
  var constantOtherSymbol = exports.constantOtherSymbol = {
    token: "constant.other.symbol.ruby", // symbol
    regex: "(?:[:][A-Za-z_]*)|(?:[A-Za-z_]*[:])" // |[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?
  };

  var qqString = exports.qqString = {
    token: "string", // single line
    regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
  };

  var constantNumericHex = exports.constantNumericHex = {
    token: "constant.numeric", // hex
    regex: "0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"
  };

  var constantNumericFloat = exports.constantNumericFloat = {
    token: "constant.numeric", // float
    regex: "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"
  };

  var BotsiHighlightRules = function() {

    var builtinFunctions = (
      "dialog|say|ask|emit|prompt|buttons|postback|invoke|open|image|audio|video|expecting|http_post|http_get|sleep|think|random"
    );

    var keywords = (
      "if|else|do|end|import|repeat|in"
    );

    var buildinConstants = (
      "true|false|nil"
    );

    var builtinVariables = (
      "__unknown__|main|delay|typing_indicator|__unknown_location__|__unknown_attachment__|__unknown_postback__"
    );

    var keywordMapper = this.$keywords = this.createKeywordMapper({
      "keyword": keywords,
      "constant.language": buildinConstants,
      "variable.language": builtinVariables,
      "support.function": builtinFunctions,
      "invalid.deprecated": "debugger" // TODO is this a remnant from js mode?
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
      "start": [{
        token: "comment",
        regex: "#.*$"
      }, {
        token: "comment", // multi line comment
        regex: "^=begin(?:$|\\s.*$)",
        next: "comment"
      }, {
        token: "string.regexp",
        regex: "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
      },

                [{
                  regex: "[{}]",
                  onMatch: function(val, state, stack) {
                    this.next = val == "{" ? this.nextState : "";
                    if (val == "{" && stack.length) {
                      stack.unshift("start", state);
                      return "paren.lparen";
                    }
                    if (val == "}" && stack.length) {
                      stack.shift();
                      this.next = stack.shift();
                      if (this.next.indexOf("string") != -1)
                        return "paren.end";
                    }
                    return val == "{" ? "paren.lparen" : "paren.rparen";
                  },
                  nextState: "start"
                }, {
                  token: "string.start",
                  regex: /"/,
                  push: [{
                    token: "constant.language.escape",
                    regex: /\\(?:[nsrtvfbae'"\\]|c.|C-.|M-.(?:\\C-.)?|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4})/
                  }, {
                    token: "paren.start",
                    regex: /#{/,
                    push: "start"
                  }, {
                    token: "string.end",
                    regex: /"/,
                    next: "pop"
                  }, {
                    defaultToken: "string"
                  }]
                }],

                constantOtherSymbol,
                constantNumericHex,
                constantNumericFloat,

                {
                  token: "constant.language.boolean",
                  regex: "(?:true|false)\\b"
                }, {
                  token: keywordMapper,
                  // TODO: Unicode escape sequences
                  // TODO: Unicode identifiers
                  regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                  token: "punctuation.separator.key-value",
                  regex: "=>"
                }, {
                  token: "string.character",
                  regex: "\\B\\?."
                }, {
                  token: "keyword.operator",
                  regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="
                }, {
                  token: "paren.lparen",
                  regex: "[[({]"
                }, {
                  token: "paren.rparen",
                  regex: "[\\])}]"
                }, {
                  token: "text",
                  regex: "\\s+"
                }
      ],
      "comment": {
        token: "comment", // comment spanning whole line
        regex: ".+"
      }
    };

    this.normalizeRules();
  };

  oop.inherits(BotsiHighlightRules, TextHighlightRules);

  exports.BotsiHighlightRules = BotsiHighlightRules;
});

ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(acequire, exports, module) {
  "use strict";

  var Range = acequire("../range").Range;

  var MatchingBraceOutdent = function() {};

  (function() {

    this.checkOutdent = function(line, input) {
      if (! /^\s+$/.test(line))
        return false;

      return /^\s*\}/.test(input);
  };

    this.autoOutdent = function(doc, row) {
      var line = doc.getLine(row);
      var match = line.match(/^(\s*\})/);

      if (!match) return 0;

      var column = match[1].length;
      var openBracePos = doc.findMatchingBracket({row: row, column: column});

      if (!openBracePos || openBracePos.row == row) return 0;

      var indent = this.$getIndent(doc.getLine(openBracePos.row));
      doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
      return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

  exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"], function(acequire, exports, module) {
  "use strict";

  var oop = acequire("../../lib/oop");
  var BaseFoldMode = acequire("./fold_mode").FoldMode;
  var Range = acequire("../../range").Range;

  var FoldMode = exports.FoldMode = function() {};
  oop.inherits(FoldMode, BaseFoldMode);

  (function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
      var range = this.indentationBlock(session, row);
      if (range)
        return range;

      var re = /\S/;
      var line = session.getLine(row);
      var startLevel = line.search(re);
      if (startLevel == -1 || line[startLevel] != "#")
        return;

      var startColumn = line.length;
      var maxRow = session.getLength();
      var startRow = row;
      var endRow = row;

      while (++row < maxRow) {
        line = session.getLine(row);
        var level = line.search(re);

        if (level == -1)
          continue;

        if (line[level] != "#")
          break;

        endRow = row;
      }

      if (endRow > startRow) {
        var endColumn = session.getLine(endRow).length;
        return new Range(startRow, startColumn, endRow, endColumn);
      }
    };
    this.getFoldWidget = function(session, foldStyle, row) {
      var line = session.getLine(row);
      var indent = line.search(/\S/);
      var next = session.getLine(row + 1);
      var prev = session.getLine(row - 1);
      var prevIndent = prev.search(/\S/);
      var nextIndent = next.search(/\S/);

      if (indent == -1) {
        session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
        return "";
      }
      if (prevIndent == -1) {
        if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
          session.foldWidgets[row - 1] = "";
          session.foldWidgets[row + 1] = "";
          return "start";
        }
      } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
        if (session.getLine(row - 2).search(/\S/) == -1) {
          session.foldWidgets[row - 1] = "start";
          session.foldWidgets[row + 1] = "";
          return "";
        }
      }

      if (prevIndent!= -1 && prevIndent < indent)
        session.foldWidgets[row - 1] = "start";
      else
        session.foldWidgets[row - 1] = "";

      if (indent < nextIndent)
        return "start";
      else
        return "";
    };

  }).call(FoldMode.prototype);

});

ace.define("ace/mode/botsi",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/botsi_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/coffee"], function(acequire, exports, module) {
  "use strict";

  var oop = acequire("../lib/oop");
  var TextMode = acequire("./text").Mode;
  var BotsiHighlightRules = acequire("./botsi_highlight_rules").BotsiHighlightRules;
  var MatchingBraceOutdent = acequire("./matching_brace_outdent").MatchingBraceOutdent;
  var Range = acequire("../range").Range;
  var CstyleBehaviour = acequire("./behaviour/cstyle").CstyleBehaviour;
  var FoldMode = acequire("./folding/coffee").FoldMode;

  var Mode = function() {
    this.HighlightRules = BotsiHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new FoldMode();
  };
  oop.inherits(Mode, TextMode);

  (function() {


    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
      var indent = this.$getIndent(line);

      var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
      var tokens = tokenizedLine.tokens;

      if (tokens.length && tokens[tokens.length-1].type == "comment") {
        return indent;
      }

      if (state == "start") {
        var match = line.match(/^.*[\{\(\[]\s*$/);
        var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
        var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
        var startingConditional = line.match(/^\s*(if|else|when)\s*/)
        if (match || startingClassOrMethod || startingDoBlock || startingConditional) {
          indent += tab;
        }
      }

      return indent;
    };

    this.checkOutdent = function(state, line, input) {
      return /^\s+(end|else)$/.test(line + input) || this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, session, row) {
      var line = session.getLine(row);
      if (/}/.test(line))
        return this.$outdent.autoOutdent(session, row);
      var indent = this.$getIndent(line);
      var prevLine = session.getLine(row - 1);
      var prevIndent = this.$getIndent(prevLine);
      var tab = session.getTabString();
      if (prevIndent.length <= indent.length) {
        if (indent.slice(-tab.length) == tab)
          session.remove(new Range(row, indent.length-tab.length, row, indent.length));
      }
    };

    this.$id = "ace/mode/botsi";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
