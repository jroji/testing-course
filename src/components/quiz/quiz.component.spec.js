import { CountriesServiceMock as CountriesService } from '../countries/__mocks__/countries.service.mock';
import { Quiz } from './quiz.component';
import { screen, waitFor, within } from '@testing-library/dom';

describe('Testing Answer component', () => {
	let countryService;
	beforeAll(() => {
		countryService = new CountriesService();
		new Quiz(document.body, countryService);
  });

  describe('after click next', () => {
    beforeAll(() => {
      const next = screen.getByText('Next');
      next.click();
    });

    it('should render answers', async () => {
      await waitFor(() => expect(document.querySelector('[data-testid="answers-section"]')).toBeVisible());

      const { getAllByRole } = within(document.querySelector('[data-testid="answers-section"]'));
      await waitFor(() => expect(getAllByRole('button').length).toBe(4));
			expect(countryService.getQuestion).toHaveBeenCalled();
    });
  })
});