import React, {Component} from "react";
import _ from "underscore";
import Markdown from "react-markdown";
import docsFile from "../api/docs.json";
import Prism from "prismjs";
import { codeRenderer, codeBlockRenderer } from "../renderers";
import { textStyle } from "../styles";

/**
 * Displays API data from the docs.json file
 */
export default class extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    componentDidUpdate() {
        Prism.highlightAll();
    }

    renderArrayOf(value) {
        if (value.name === "shape") {
            return "shape {" +
                _.map(value.value, (value, key) => {
                    return key;
                }).join(", ") +
                "}";
        } else {
            return `array of ${value.name}s`;
        }
    }

    renderPropType(type) {
        if (!type) {
            return "unknown type";
        }
        if (type.name === "enum") {
            return "enum (" +
                _.map(type.value, value => {
                    return value.value;
                }).join(", ") +
                ")";
        }
        if (type.name === "union") {
            return "one of (" +
                _.map(type.value, value => {
                    return this.renderPropType(value);
                }).join(", ") +
                ")";
        }
        if (type.name === "instanceOf") {
            return `instance of a ${type.value}`;
        }
        if (type.name === "arrayOf") {
            return `array of ${this.renderArrayOf(type.value)}`;
        }
        if (type.name === "shapes") {
            return `shape of {` +
                _.map(type.value, (value, key) => {
                    return key;
                }).join(", ") +
                "}";
        } else {
            return `${type.name}`;
        }
    }

    renderProps(props) {
        const propNameStyle = {
            padding: 3,
            marginRight: 5,
            borderRadius: 2,
            fontFamily: "'Fira Mono',Menlo,monospace",
            color: "#c7254e",
            background: "#f9f2f4",
            letterSpacing: -0.015
        };

        const infoStyle = {
            color: "#626466",
            fontFamily: "Fira Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
            fontSize: 16,
            lineHeight: 1.625
        };

        const typeStyle = {
            color: "#626466",
            background: "#F5F4F4",
            fontFamily: "Fira Sans,Helvetica Neue,Helvetica,Arial,sans-serif",
            fontSize: 16,
            lineHeight: 1.625
        };

        return _.map(props, (prop, propName) => (
            <div key={propName}>
                <span style={propNameStyle}>
                    {propName}
                </span>
                <span style={textStyle}>
                    {prop.defaultValue ? ` = ${prop.defaultValue.value}` : ""}
                </span>
                <span className="label label-default">
                    {prop.required ? "Required" : ""}
                </span>
                <div style={infoStyle}>
                    <Markdown 
                        source={prop.description ? prop.description : ""}
                        renderers={{ Code: codeRenderer, CodeBlock: codeBlockRenderer }}
                    />
                </div>
                <span style={typeStyle}>
                    Type: {this.renderPropType(prop.type)}
                </span>
                <hr />
            </div>
        ));
    }

    /**
     * If we add back in auto props, add this to the JSX below:
     * {docs.props ? this.renderProps(docs.props) : ""}
     */
    render() {
        const file = this.props.file;
        const docs = docsFile[file];
        return (
            <div>
                <h3>API</h3>
                <Markdown 
                    source={docs.description}
                    renderers={{ Code: codeRenderer, CodeBlock: codeBlockRenderer }}
                />
                <hr />
                <h3>Props</h3>
                <hr />
                {docs.props ? this.renderProps(docs.props) : "none"}
            </div>
        );
    }
};
