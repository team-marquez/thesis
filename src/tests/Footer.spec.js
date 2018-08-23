import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from '../../client/src/components/Footer.jsx';

configure({ adapter: new Adapter() });

describe('Footer', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(3);
  });
  it('should render a <div />', () => {
    expect(wrapper.find('a').length).toEqual(4);
  });
});