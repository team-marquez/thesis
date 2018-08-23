import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../../client/src/components/Footer.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Footer', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div').length).toEqual(3);
  });
});