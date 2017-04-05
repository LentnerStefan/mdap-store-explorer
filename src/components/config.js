import React from 'react';
import { Checkbox } from 'focus-components/components/input';


export default React.createClass({
    displayName: 'store-explorer-config',

    getInitialState() {
        return {
            wip: {
                value: false,
                label: 'WIP',
                opt: 'wip'
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
                    <Checkbox value={option.value} onChange={() => {this.handleFieldChange(option)}} />
                    {option.label}
                </ul>
            )
        });
    },
    render() {
        return (
            <div className='store-explorer-config'>
                <li >
                    {this.displayOptions()}
                </li>
            </div>
        )
    }
})
