import React, { Component, PropTypes } from 'react';
import CoreStore from 'focus-core/store/CoreStore'
import lodash from 'lodash';
import JSONTree from 'react-json-tree';


export default React.createClass({
    displayName: 'customDevTools-store-line',

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
        return this.state.isExpanded ? 'customDevTools-line-expanded' : 'customDevTools-line-collapsed';
    },

    getIconClassName() {
        return this.state.isExpanded ? 'customDevTools-button-line-expanded' : 'customDevTools-button-line-collapsed';
    },
    getStoreStatusIcon() {
        switch (this.props.store.status) {
            case 'loaded':
                return 'L';
            case 'saved':
                return 'S';
            case 'deleted':
                return 'D';
            case 'updated':
                return 'U';
            default:
                return 'C';
        }
    },

    render() {
        let storeName = this.props.store.name;
        let storeType = this.props.store.type;
        let storeValue = this.props.store.value;
        let storeStatus = this.props.store.status;
        return (
            <li className={this.getClassName()} key={storeName}>
                <div>
                    {storeName + ' - '}
                    <i>{storeType}</i>
                    {storeStatus &&
                        <div className='storeStatus' >
                            <span className='storeStatusIcon'><b>{this.getStoreStatusIcon()}</b></span>
                            <span className='storeStatusDisplay'><b>{storeStatus}</b></span>
                        </div>
                    }
                </div>
                <div style={{ cursor: 'pointer' }} className={this.getIconClassName()} onClick={this.handleCollapse} />
                <div className='customDevTools-line-values'>
                    <JSONTree data={storeValue} />
                </div>
            </li>
        )
    }
})
