import { render, screen } from '@testing-library/react';
import App from './App';

test('renders health screening recommender heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Health Screening Recommender/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders form inputs', () => {
  render(<App />);
  const conditionInput = screen.getByPlaceholderText(/Health Conditions/i);
  const historyInput = screen.getByPlaceholderText(/Medical History/i);
  const demographicsInput = screen.getByPlaceholderText(/Age, Gender, etc./i);
  const zipCodeInput = screen.getByPlaceholderText(/ZIP Code/i);
  
  expect(conditionInput).toBeInTheDocument();
  expect(historyInput).toBeInTheDocument();
  expect(demographicsInput).toBeInTheDocument();
  expect(zipCodeInput).toBeInTheDocument();
});

test('renders recommendations when form is submitted', () => {
  render(<App />);
  
  // Simulate filling out the form and submitting it
  const conditionInput = screen.getByPlaceholderText(/Health Conditions/i);
  const historyInput = screen.getByPlaceholderText(/Medical History/i);
  const demographicsInput = screen.getByPlaceholderText(/Age, Gender, etc./i);
  const zipCodeInput = screen.getByPlaceholderText(/ZIP Code/i);
  const submitButton = screen.getByRole('button', { name: /Get Recommendations/i });

  // Fill out the form
  conditionInput.value = 'Hypertension';
  historyInput.value = 'Heart disease';
  demographicsInput.value = '35, Male';
  zipCodeInput.value = '12345';

  // Submit the form
  submitButton.click();

  // Check if results are shown
  const screeningElement = screen.getByText(/Blood Pressure Check/i);
  const locationElement = screen.getByText(/General Hospital, 5 miles away/i);

  expect(screeningElement).toBeInTheDocument();
  expect(locationElement).toBeInTheDocument();
});
