import React from "react";
import { shallow } from "enzyme";

import { Footer } from "../../client/components/Footer";

test("Renders footer", () => {
  const wrapper = shallow(<Footer initialShow={true} />);
  // const actual = wrapper.Footer("footer").toHaveReturned();
  console / log(wrapper.debug());
  // expect(actual).toHaveReturned(expected);
});
escape;
