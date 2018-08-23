import React from 'react';
import {shallow} from 'enzyme';
import LocationModal from '../../client/src/components/LocationModal.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('LocationModal', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<LocationModal />);
    expect(wrapper.find('div').length).toEqual(0);
  });
});