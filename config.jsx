import React, { Component, PropTypes } from 'react';
import lodash from 'lodash';
import { Checkbox } from 'focus-components/components/input';



export default React.createClass({
    displayName: 'store-explorer-config',

    getInitialState() {
        return {
            listenerCount: {
                value: false,
                label: 'Listener Count',
                opt:'listenerCount'
            },
            appStores: {
                value: false,
                label: 'Show App Stores',
                opt:'appStores'
            }
        }
    },
    handleFieldChange(option) {
        option.value = !option.value;
        let state=this.state;
        state[option.opt]=option;
        this.setState(state);
    },

    getOptionsValues() {
        return this.state;
    },

    displayOptions() {
        return _.map(this.state, (option) => {
            return (
                <ul className='store-explorer-config-line'>
                    <Checkbox value={option.value} onChange={()=>{this.handleFieldChange(option)}} />
                    {option.label}
                </ul>
            )
        });
    },
    render() {
        return (
            <li >
                {this.displayOptions()}
            </li>
        )
    }
})
