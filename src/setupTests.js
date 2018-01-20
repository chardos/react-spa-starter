/* eslint-disable */

// Required to run the Snapshot tests using enzyme-to-json/serializer in React 16
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Mock the localStorage/sessionStorage object
export const mockLocalStorage = {
    getItem: function(key) {
        return this[key];
    },

    setItem: function(key, value){
        if (typeof value === 'object') {
            this[key] = JSON.stringify(value);
        } else {
            this[key] = value;
        }
    },

    removeItem: function(key){
        delete this[key];
    }
};

global.sessionStorage = mockLocalStorage;
global.localStorage = mockLocalStorage;
