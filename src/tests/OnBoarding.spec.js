import React from 'react';
import {shallow} from 'enzyme';
import OnBoarding from '../../client/src/components/OnBoarding.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('OnBoarding', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<OnBoarding />);
    expect(wrapper.find('div').length).toEqual(0);
  });
});