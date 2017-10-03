import React from 'react';
import JSONTree from 'react-json-tree';


export default React.createClass({
    displayName: 'mdap-store-line',

    getInitialState() {
        return {
            isExpanded: false
        }
    },

    handleCollapse() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    },

    getClassName() {
        return this.state.isExpanded ? 'mdap-store-line-expanded' : 'mdap-store-line-collapsed';
    },

    getIconClassName() {
        return this.state.isExpanded ? 'mdap-store-button-line-expanded' : 'mdap-store-button-line-collapsed';
    },

    render() {
        let {name,type,value}=this.props.store;
        return (
            <li className={this.getClassName()} key={name}>
                <div>
                    {name + ' - '}
                    <i>{type}</i>
                </div>
                <div style={{ cursor: 'pointer' }} className={this.getIconClassName()} onClick={this.handleCollapse} />
                <div className='mdap-store-line-values'>
                    <JSONTree data={value} />
                </div>
            </li>
        )
    }
})
