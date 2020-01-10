import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';
describe("SearchBox", () => {
  it("should render my component", () => {
    const onChange = () => {};
    const wrapper = shallow(<SearchBox onChange={onChange} />);
  });
});