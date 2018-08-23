import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AllDays from '../../client/src/components/AllDays.jsx';

configure({ adapter: new Adapter() });

describe('AllDays', () => {
    it('should render a <div />', () => {
      const wrapper = shallow(<AllDays />);
      expect(wrapper.find('div').length).toEqual(0);
    });
  });

