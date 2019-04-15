import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from '../messages';
import MapPage from '../index';

describe('<MapPage />', () => {
  it('should render its heading', () => {
    const renderedComponent = shallow(<MapPage />);
    expect(
      renderedComponent.contains(
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>,
      ),
    ).toBe(true);
  });

  it('should never re-render the component', () => {
    const renderedComponent = shallow(<MapPage />);
    const inst = renderedComponent.instance();
    expect(inst.shouldComponentUpdate()).toBe(false);
  });
});
