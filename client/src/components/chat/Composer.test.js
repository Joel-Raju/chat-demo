import React from 'react';
import { shallow } from 'enzyme';
import Composer from './Composer';
describe("Composer", () => {
  it("should render my component", () => {
    const sendMessage = () => {};
    const wrapper = shallow(<Composer sendMessage={sendMessage}/>);
  });
});