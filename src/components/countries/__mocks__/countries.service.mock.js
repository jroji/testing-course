// __mocks__/countries.service.mock.js

export const mockGetQuestion = jest.fn().mockReturnValue(Promise.resolve({
  countryName: 'España',
  answers: ['Madrid', 'Kiev', 'Barcelona', 'Pekin'],
  correctAnswer: 'Madrid'
}));

export const CountriesServiceMock = jest.fn().mockImplementation(() => {
  return {
    getQuestion: mockGetQuestion
  };
});