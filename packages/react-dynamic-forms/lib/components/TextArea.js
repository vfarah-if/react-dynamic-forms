"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _revalidator = require("revalidator");

var _formGroup = require("../js/formGroup");

var _formGroup2 = _interopRequireDefault(_formGroup);

var _renderers = require("../js/renderers");

var _actions = require("../js/actions");

var _style2 = require("../js/style");

require("../css/textarea.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015 - present, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Form control to edit a Text Area field
 */
var TextArea = function (_React$Component) {
    _inherits(TextArea, _React$Component);

    function TextArea(props) {
        _classCallCheck(this, TextArea);

        var _this = _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));

        _this.state = {
            value: props.value,
            isFocused: false,
            touched: false,
            selectText: false
        };
        return _this;
    }

    _createClass(TextArea, [{
        key: "handleMouseEnter",
        value: function handleMouseEnter() {
            this.setState({ hover: true });
        }
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave() {
            this.setState({ hover: false });
        }
    }, {
        key: "handleEditItem",
        value: function handleEditItem() {
            this.props.onEditItem(this.props.name);
        }
    }, {
        key: "isEmpty",
        value: function isEmpty(value) {
            return _underscore2.default.isNull(value) || _underscore2.default.isUndefined(value) || value === "";
        }
    }, {
        key: "isMissing",
        value: function isMissing(v) {
            return this.props.required && !this.props.disabled && this.isEmpty(v);
        }
    }, {
        key: "getError",
        value: function getError(value) {
            var result = { validationError: false, validationErrorMessage: null };

            // If the user has a field blank then that is never an error
            // Likewise if this item is disabled it can't be called an error
            if (this.isEmpty(value) || this.props.disabled) {
                return result;
            }

            // Validate the value with Revalidator, given the rules in this.props.rules
            var obj = {};
            obj[this.props.name] = value;

            var properties = {};
            properties[this.props.name] = this.props.validation;

            var rules = this.props.validation ? { properties: properties } : null;
            if (obj && rules) {
                var validation = (0, _revalidator.validate)(obj, rules, { cast: true });
                var name = this.props.name || "Value";

                var msg = void 0;
                if (!validation.valid) {
                    msg = name + " " + validation.errors[0].message;
                    result.validationError = true;
                    result.validationErrorMessage = msg;
                }
            }
            return result;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.edit !== nextProps.edit && nextProps.edit === true) {
                this.setState({ selectText: true });
            }
            if (this.state.value !== nextProps.value && !this.state.isFocused) {
                this.setState({ value: nextProps.value });

                var missing = this.isMissing(nextProps.value);

                var _getError = this.getError(nextProps.value),
                    validationError = _getError.validationError;

                // Broadcast error and missing states up to the parent


                if (this.props.onErrorCountChange) {
                    this.props.onErrorCountChange(this.props.name, validationError ? 1 : 0);
                }
                if (this.props.onMissingCountChange) {
                    this.props.onMissingCountChange(this.props.name, missing ? 1 : 0);
                }
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var missing = this.isMissing(this.props.value);

            var _getError2 = this.getError(this.props.value),
                validationError = _getError2.validationError;

            // Initial error and missing states are fed up to the parent


            if (this.props.onErrorCountChange) {
                this.props.onErrorCountChange(this.props.name, validationError ? 1 : 0);
            }

            if (this.props.onMissingCountChange) {
                this.props.onMissingCountChange(this.props.name, missing ? 1 : 0);
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.state.selectText) {
                this.textInput.focus();
                this.textInput.select();
                this.setState({ selectText: false });
            }
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            var _this2 = this;

            var name = this.props.name;
            var value = e.target.value;

            this.setState({ value: value }, function () {
                var missing = _this2.props.required && _this2.isEmpty(value);

                var _getError3 = _this2.getError(value),
                    validationError = _getError3.validationError;

                // Callbacks


                if (_this2.props.onErrorCountChange) {
                    _this2.props.onErrorCountChange(name, validationError ? 1 : 0);
                }

                if (_this2.props.onMissingCountChange) {
                    _this2.props.onMissingCountChange(name, missing ? 1 : 0);
                }

                if (_this2.props.onChange) {
                    _this2.props.onChange(name, value);
                }
            });
        }
    }, {
        key: "handleFocus",
        value: function handleFocus() {
            if (!this.state.isFocused) {
                this.setState({ isFocused: true, oldValue: this.props.value });
            }
        }
    }, {
        key: "handleKeyPress",
        value: function handleKeyPress(e) {
            if (e.key === "Enter") {
                if (!e.shiftKey) {
                    this.handleDone();
                }
            }
            if (e.keyCode === 27 /* ESC */) {
                    this.handleCancel();
                }
        }
    }, {
        key: "handleDone",
        value: function handleDone() {
            if (this.props.onBlur) {
                this.props.onBlur(this.props.name);
            }
            this.setState({ isFocused: false, hover: false, oldValue: null });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            console.log("REVERT TO", this.state.oldValue);

            if (this.props.onChange) {
                var v = this.state.oldValue;
                console.log("ON CHANGE", v);
                var cast = v;
                if (_underscore2.default.has(this.props.rules, "type")) {
                    switch (this.props.rules.type) {
                        case "integer":
                            cast = v === "" ? null : parseInt(v, 10);
                            break;
                        case "number":
                            cast = v === "" ? null : parseFloat(v, 10);
                            break;
                        //pass
                        default:
                    }
                }
                console.log("ON CHANGE >>", cast);
                this.props.onChange(this.props.name, cast);
            }
            this.props.onBlur(this.props.name);
            this.setState({ isFocused: false, hover: false, oldValue: null });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            // Control state
            var isMissing = this.isMissing(this.props.value);

            var _getError4 = this.getError(this.props.value),
                validationError = _getError4.validationError,
                validationErrorMessage = _getError4.validationErrorMessage;

            if (this.props.edit) {
                // Error style/message
                var className = "";
                var msg = validationError ? validationErrorMessage : "";
                var helpClassName = "help-block";
                if (validationError && this.state.touched) {
                    helpClassName += " has-error";
                    className = "has-error";
                }

                // Warning style
                var style = isMissing ? { background: "floralwhite" } : {};

                // Inline edit buttons
                var doneStyle = {
                    padding: 5,
                    marginLeft: 5,
                    fontSize: 12,
                    height: 30,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(70, 129, 180, 0.19)",
                    borderRadius: 2,
                    color: "steelblue",
                    cursor: "pointer"
                };

                var cancelStyle = {
                    padding: 5,
                    marginLeft: 3,
                    marginBottom: 5,
                    height: 30,
                    color: "#AAA",
                    cursor: "pointer",
                    fontSize: 12
                };

                return _react2.default.createElement(
                    "div",
                    { className: className, style: { marginBottom: 10 } },
                    _react2.default.createElement("textarea", {
                        ref: function ref(input) {
                            _this3.textInput = input;
                        },
                        className: "form-control",
                        style: style,
                        type: "text",
                        disabled: this.props.disabled,
                        placeholder: this.props.placeholder,
                        value: this.state.value,
                        onChange: function onChange(e) {
                            return _this3.handleChange(e);
                        },
                        onFocus: function onFocus(e) {
                            return _this3.handleFocus(e);
                        },
                        onKeyUp: function onKeyUp(e) {
                            return _this3.handleKeyPress(e);
                        }
                    }),
                    _react2.default.createElement(
                        "div",
                        { className: helpClassName },
                        msg
                    ),
                    this.props.selected ? _react2.default.createElement(
                        "span",
                        { style: { marginTop: 5 } },
                        _react2.default.createElement(
                            "span",
                            { style: doneStyle, onClick: function onClick() {
                                    return _this3.handleDone();
                                } },
                            "DONE"
                        ),
                        _react2.default.createElement(
                            "span",
                            { style: cancelStyle, onClick: function onClick() {
                                    return _this3.handleCancel();
                                } },
                            "CANCEL"
                        )
                    ) : _react2.default.createElement("div", null)
                );
            } else {
                var view = this.props.view || _renderers.textView;
                var text = isMissing ? _react2.default.createElement("span", null) : view(this.props.value);
                var edit = (0, _actions.editAction)(this.state.hover && this.props.allowEdit, function () {
                    return _this3.handleEditItem();
                });

                var _style = (0, _style2.inlineTextAreaStyle)(validationError, isMissing);

                return _react2.default.createElement(
                    "div",
                    {
                        style: _style,
                        onMouseEnter: function onMouseEnter() {
                            return _this3.handleMouseEnter();
                        },
                        onMouseLeave: function onMouseLeave() {
                            return _this3.handleMouseLeave();
                        }
                    },
                    text,
                    _react2.default.createElement(
                        "span",
                        null,
                        edit
                    )
                );
            }
        }
    }]);

    return TextArea;
}(_react2.default.Component);

exports.default = (0, _formGroup2.default)(TextArea);