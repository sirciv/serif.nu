/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import * as useSelector from './use-selector';

jest.mock('./use-selector');

// Helper function that returns a function which creates enzyme wrappers with default props
export function wrapperCreator(Component, defaultProps = {}) {
  let classes;
  return props => shallow(<Component classes={classes} {...defaultProps} {...props} />);
}

/* istanbul ignore next */
export function mockUseSelector(...args) {
  useSelector.default.mockReset();
  let callCounter = 0;
  useSelector.default.mockImplementation(() => {
    const mockValue = args[callCounter % args.length];
    callCounter += 1;
    return mockValue;
  });

  return useSelector.default;
}

/* istanbul ignore next */
export function mockUseDispatch() {
  const dispatchSpy = jest.fn();
  reactRedux.useDispatch.mockReturnValue(dispatchSpy);
  return dispatchSpy;
}

// Default test objects

const testDow = ['Mo'];

export const testSchedule = {
  dow: testDow,
  start: {
    hour: 10,
    minute: 30,
  },
  end: {
    hour: 12,
    minute: 0,
  },
  location: 'Somewhere',
};

const testName = 'Introduction to Something';
const testDescription = { name: '', value: '' };

export const testSection = {
  id: '12345',
  termId: '111111',
  schoolId: 'MEAS',
  subjectId: 'COMP_SCI',
  courseId: '101-1',
  name: testName,
  sectionNumber: '1',
  topic: 'Section topic...',
  descriptions: [testDescription],
  instructors: [''],
  schedules: [testSchedule],
};
