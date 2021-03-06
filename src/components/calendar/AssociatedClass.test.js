import React from 'react';
import { shallow } from 'enzyme';
import * as timeUtils from 'util/time';
import Section from 'components/common/Section';
import { testSchedule, testSection } from 'util/testing';
import ClassModal from './ClassModal';
import AssociatedClass, { styles, MAX_WIDTH_PERCENT } from './AssociatedClass';

jest.mock('util/time');

describe('dynamic styles', () => {
  const dow = 'Mo';
  const event = { ...testSchedule, dow };

  const hour = 10;
  const color = 'some color';
  const associatedClass = { event, color, column: 0, columnWidth: 1 };

  it('correctly calculates section card placement', () => {
    expect(styles.paper.top({ hour, dow, associatedClass })).toBe('50%');
  });

  it('correctly calculates section card height', () => {
    timeUtils.getDurationInHours.mockReturnValue(1);
    expect(styles.paper.height({ associatedClass })).toBe('100%');
  });

  it('correctly grabs the section background color', () => {
    expect(styles.paper.backgroundColor({ associatedClass })).toBe(color);
  });

  it('correctly calculates left offset', () => {
    expect(styles.paper.left({ associatedClass })).toBe('0%');
  });

  it('correctly calculates width', () => {
    expect(styles.paper.width({ associatedClass })).toBe(`${MAX_WIDTH_PERCENT}%`);
  });

  it('correctly sets zIndex to 1 when class is not preview', () => {
    expect(styles.paper.zIndex({ isPreview: false })).toBe(1);
  });

  it('correctly sets zIndex to 2 when class is preview', () => {
    expect(styles.paper.zIndex({ isPreview: true })).toBe(2);
  });
});

describe('AssociatedClass', () => {
  const dow = 'Mo';
  const event = { ...testSchedule, dow };
  const color = 'some color';
  const associatedClass = {
    event,
    color,
    column: 0,
    columnWidth: 1,
    type: 'LAB',
    schedule: {
      ...event,
      dow: ['Mo'],
      location: 'Somewhere',
    },
  };

  const defaultProps = {
    associatedClass,
    section: testSection,
    isPreview: false,
  };

  it('renders correctly', () => {
    timeUtils.getFormattedEventTime.mockReturnValue('left hand header content');
    const wrapper = shallow(
      <AssociatedClass {...defaultProps} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders modal correctly', () => {
    const wrapper = shallow(
      <AssociatedClass {...defaultProps} />,
    );

    wrapper.find(Section).simulate('click');

    expect(wrapper.find(ClassModal).prop('showDialog')).toBe(true);
  });
});
