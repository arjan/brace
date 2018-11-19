ace.define("ace/theme/clouds_content_mode",["require","exports","module","ace/lib/dom"], function(acequire, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-clouds-content-mode";
exports.cssText = ".ace-clouds-content-mode .ace_marker-layer {\
z-index: 2;\
mix-blend-mode: darken;\
}\
.ace-clouds-content-mode .ace_gutter {\
background: #ebebeb;\
color: #333\
}\
.ace-clouds-content-mode .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-clouds-content-mode {\
background-color: #ebebeb;\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_cursor {\
color: #000000\
}\
.ace-clouds-content-mode .ace_marker-layer .ace_selection {\
background: #BDD5FC\
}\
.ace-clouds-content-mode.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFFFFF;\
}\
.ace-clouds-content-mode .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0)\
}\
.ace-clouds-content-mode .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-clouds-content-mode .ace_gutter-active-line {\
background-color : #dcdcdc\
}\
.ace-clouds-content-mode .ace_marker-layer .ace_selected-word {\
border: 1px solid #BDD5FC\
}\
.ace-clouds-content-mode .ace_invisible {\
color: #BFBFBF\
}\
.ace-clouds-content-mode .ace_keyword,\
.ace-clouds-content-mode .ace_meta,\
.ace-clouds-content-mode .ace_support.ace_constant.ace_property-value {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_keyword.ace_operator {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_keyword.ace_other.ace_unit {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_constant.ace_language {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_constant.ace_numeric {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_constant.ace_character.ace_entity {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_invalid {\
background-color: #FF002A\
}\
.ace-clouds-content-mode .ace_fold {\
background-color: #b0b0b0;;\
border-color: #000000\
}\
.ace-clouds-content-mode .ace_storage,\
.ace-clouds-content-mode .ace_support.ace_class,\
.ace-clouds-content-mode .ace_support.ace_function,\
.ace-clouds-content-mode .ace_support.ace_other,\
.ace-clouds-content-mode .ace_support.ace_type {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_string {\
color: #5D90CD;\
background-color: #fff;\
}\
.ace-clouds-content-mode .ace_comment {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_entity.ace_name.ace_tag,\
.ace-clouds-content-mode .ace_entity.ace_other.ace_attribute-name {\
color: #b0b0b0;\
}\
.ace-clouds-content-mode .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y\
}\
";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    ace.acequire(["ace/theme/clouds_content_mode"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            