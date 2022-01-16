describe('Parameterized tests', () => {
  describe('Simple array of parameters', () => {
    [1, 2, 3].forEach((testCase) => {
      it('should be a number', () => {
        const isNumber = Number.isInteger(testCase);
        expect(isNumber).toBeTruthy();
      });
    });
  });
  describe('Using parameters in the test description', () => {
    [-1, 0, 1].forEach((testCase) => {
      it(`should evaluate ${testCase} as ${
        testCase > 0 ? '' : 'non'
      }positive`, () => {
        // given
        const integer = testCase;
        const expectedResult = testCase > 0;

        // when
        const isPositive = integer > 0;

        // then
        expect(isPositive).toBe(expectedResult);
      });
    });
  });
  describe('Including the expected result as a parameter ', () => {
    [
      [-1, false],
      [0, false],
      [1, true],
    ].forEach((testCase) => {
      it(`should evaluate ${testCase[0]} as ${
        testCase[1] ? '' : 'non'
      }positive`, () => {
        // given
        const integer = testCase[0];

        // when
        const isPositive = integer > 0;

        // then
        expect(isPositive).toBe(!!testCase[1]);
      });
    });
  });
  describe('Using objects as parameters', () => {
    [
      {
        value: -1,
        result: false,
        description: `should evaluate -1 as nonpositive`,
      },
      {
        value: 0,
        result: false,
        description: `should evaluate 0 as nonpositive`,
      },
      {
        value: 1,
        result: true,
        description: `should evaluate 1 as positive`,
      },
    ].forEach((testCase) => {
      it(testCase.description, () => {
        // given
        const integer = testCase.value;

        // when
        const isPositive = integer > 0;

        // then
        expect(isPositive).toBe(testCase.result);
      });
    });
  });
  describe('Using random data', () => {
    generateTestCases(10).forEach((testCase) => {
      it(testCase.description, () => {
        // given
        const integer = testCase.value;

        // when
        const isPositive = integer > 0;

        // then
        expect(isPositive).toBe(testCase.result);
      });
    });
  });

  function generateTestCases(numberToGenerate: number) {
    const testCases = [];

    for (let index = 0; index < numberToGenerate; index++) {
      const value = Math.floor(Math.random() * 21) - 10;
      const isPositive = value > 0;

      testCases.push({
        value,
        result: isPositive,
        description: isPositive
          ? `should evaluate ${value} as positive`
          : `should evaluate ${value} as nonpositive`,
      });
    }
    return testCases;
  }
});
