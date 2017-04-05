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
        let {name,type,value,status}=this.props.store;
        return (
            <li className={this.getClassName()} key={name}>
                <div>
                    {name + ' - '}
                    <i>{type}</i>
                    {status &&
                        <div className='storeStatus' >
                            <span className='storeStatusIcon'><b>{this.getStoreStatusIcon()}</b></span>
                            <span className='storeStatusDisplay'><b>{status}</b></span>
                        </div>
                    }
                </div>
                <div style={{ cursor: 'pointer' }} className={this.getIconClassName()} onClick={this.handleCollapse} />
                <div className='mdap-store-line-values'>
                    <JSONTree data={value} />
                </div>
            </li>
        )
    }
})
