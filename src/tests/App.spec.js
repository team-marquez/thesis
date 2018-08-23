import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../client/src/components/App.jsx';
import LoginButton from "../../client/src/components/LoginButton.jsx";
import LocationModal from "../../client/src/components/LocationModal.jsx";
import Footer from "../../client/src/components/Footer.jsx";
import Onboarding from '../../client/src/components/Onboarding.jsx'

configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(5);
  });
  it('should render the LoginButton Component', () => {
    expect(wrapper.containsMatchingElement(<LoginButton />)).toEqual(true);
  });
  it('should render the LocationModal Component', () => {
    expect(wrapper.containsMatchingElement(<LocationModal />)).toEqual(true);
  });
  it('should render the Footer Component', () => {
    expect(wrapper.containsMatchingElement(<Footer />)).toEqual(true);
  });
  it('should render the Onboarding Component', () => {
    expect(wrapper.containsMatchingElement(<Onboarding />)).toEqual(true);
  });
});