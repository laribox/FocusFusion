import { CatNamePipe } from './cat-name.pipe';

describe('CatNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CatNamePipe();
    expect(pipe).toBeTruthy();
  });
});
