import { CountriesServiceMock as CountriesService } from '../countries/__mocks__/countries.service.mock';
import { Quiz } from './quiz.component';
import userEvent from '@testing-library/user-event'
import { screen, within } from '@testing-library/dom';

describe('Testing Answer component', () => {
	let countryService;

	beforeAll(() => {
		countryService = new CountriesService();
		new Quiz(document.body, countryService);
  });

  it('next button should be visible', () => {
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeVisible();
  });

  describe('after click next', () => {

    beforeAll(async () => {
      await userEvent.click(screen.getByText('Next'));
    });

    it('next button should disappear', () => {
      const nextButton = screen.getByText('Next');
      expect(nextButton).not.toBeVisible();
    });

    it('should render answers', async () => {
      const { getAllByRole } = within(document.querySelector('[data-testid="answers-section"]'));
      expect(getAllByRole('button').length).toBe(4);
    });

		describe('after click on a correct answer', () => {
      beforeAll(async () => {
        await userEvent.click(screen.getByText('Madrid'));
      });

      it('should render next button', () => {
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeVisible();
      });

      it('should update score', () => {
        const score = screen.getByText(/Score:/);
        expect(score).toHaveTextContent('Score: 1');
      });
		});
  })
});