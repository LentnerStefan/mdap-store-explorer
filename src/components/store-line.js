import React from "react";
import JSONTree from "react-json-tree";

export default React.createClass({
    displayName: "mdap-store-line",

    getInitialState() {
        return {
            isExpanded: false
        };
    },

    handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    },

    getClassName() {
        return this.state.isExpanded
            ? "mdap-store-line-expanded"
            : "mdap-store-line-collapsed";
    },

    getIconClassName() {
        return this.state.isExpanded
            ? "mdap-store-button-line-expanded"
            : "mdap-store-button-line-collapsed";
    },
    getRecordingIcon() {
        if (this.props.isRecording) {
            if (this.props.store.hasChanged) {
                return (
                    <div className="circle-loader load-complete">
                        <div className="checkmark draw" />
                    </div>
                );
            }
            return <div className="circle-loader" />;
        }
        return null;
    },
    render() {
        let { name, type, value } = this.props.store;
        return (
            <li className={this.getClassName()}>
                <div>
                    {name + " - "}
                    <i>{type}</i>
                    {this.getRecordingIcon()}
                </div>
                <div
                    style={{ cursor: "pointer" }}
                    className={this.getIconClassName()}
                    onClick={this.handleCollapse}
                />
                <div className="mdap-store-line-values">
                    <JSONTree data={value} />
                </div>
            </li>
        );
    }
});
