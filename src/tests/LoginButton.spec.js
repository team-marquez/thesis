import React from 'react';
import {shallow} from 'enzyme';
import LoginButton from '../../client/src/components/LoginButton.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('LoginButton', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<LoginButton />);
    expect(wrapper.find('div').length).toEqual(6);
  });
});