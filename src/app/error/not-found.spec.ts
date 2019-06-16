import { NotFoundError } from './not-found-error';

describe('NotFound', () => {
  it('should create an instance', () => {
    expect(new NotFoundError()).toBeTruthy();
  });
});
