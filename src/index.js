import React from "react";

//Components
import StoreExplorer from "./components/store-explorer";

// Styles
import "./styles/mdap-dev-tools.scss";

export default React.createClass({
    displayName: "Mdap-store-explorer",

    getInitialState() {
        return {
            isExpanded: false,
            isDisplayed: false,
            isRecording:false,
            filterTextValue: ""
        };
    },
    componentWillMount() {},

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    },

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
    handleKeyDown(e) {
        // Ignore regular keys when focused on a field
        // and no modifiers are active.
        if (
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey &&
            (e.target.tagName === "INPUT" ||
                e.target.tagName === "SELECT" ||
                e.target.tagName === "TEXTAREA" ||
                e.target.isContentEditable)
        ) {
            return;
        }
        const charCode = e.keyCode || e.which;
        if (charCode === 77 && e.ctrlKey) {
            this.setState({
                isDisplayed: !this.state.isDisplayed,
                isRecording:this.state.isDisplayed?false:this.state.isRecording
            });
        }
    },

    handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded,
            isRecording:false
        });
    },

    getContainerClassName() {
        return this.state.isExpanded
            ? "container-window expanded"
            : "container-window collapsed";
    },

    refresh() {
        this.refs && this.refs.storeExplorer && this.refs.storeExplorer.refresh();
    },
    getRecordIconClassName(){
        return this.state.isRecording           
        ? "pulse-button recording"
        : "pulse-button";
    },

    render() {
        return (
            <div
                className={this.getContainerClassName()}
                style={{ display: this.state.isDisplayed ? "inline" : "none" }}
            >
                <div className="header-bar">
                    <div className="header-title">
                        <b>{"Store explorer"}</b>
                    </div>
                    <div className="refresh-icon" onClick={this.refresh} />
                    <div className="pulse-container">
                        <button className={this.getRecordIconClassName()} onClick={()=>{
                            if(this.state.isRecording===true){
                                this.setState({isRecording:false})
                            }
                            else{
                                this.refresh();
                                this.setState({isRecording:true})
                            }
                        }}></button>
                    </div>
                    <form
                        className="search-input-container"
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            className="search-input"
                            type="text"
                            value={this.state.filterTextValue}
                            name="storeNameFilter"
                            onChange={e => {
                                this.setState({
                                    filterTextValue: e.target.value
                                });
                            }}
                            placeholder="store..."
                            autoComplete={"off"}
                        />
                    </form>
                    <div
                        className="collapse-button-container"
                        onClick={this.handleCollapse}
                    >
                        <div className="mdap-store-button" />
                    </div>
                </div>
                <div className="store-explorer">
                    <StoreExplorer
                        ref="storeExplorer"
                        filterTextValue={this.state.filterTextValue}
                        isRecording={this.state.isRecording}
                    />
                </div>
            </div>
        );
    }
});
