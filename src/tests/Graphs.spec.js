import React from 'react';
import {shallow} from 'enzyme';
import Graphs from '../../client/src/components/Graphs.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Graphs', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Graphs />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});