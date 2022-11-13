import { DeeplinkBuilder } from '../src';

describe('Deeplink builder Module', () => {
  let builder: DeeplinkBuilder;
  let randomUpiId = 'random@okicici';
  let randomName = 'random';

  beforeEach(() => {
    builder = new DeeplinkBuilder(randomName, randomUpiId);
  });

  it('should have created instance of builder', () => {
    expect(builder).toBeTruthy();
  });

  it('should contain payee name and vpa', () => {
    const link = builder.build();
    expect(link).toContain(randomName);
    expect(link).toContain(randomUpiId);
  });

  it('should have transaction amount', () => {
    const amount = (Math.random() * 100).toFixed(2);
    const link = builder.addTransactionAmount(amount).build();
    expect(link).toContain(amount);
  });

  it('should have minimum transaction amount', () => {
    const amount = (Math.random() * 100).toFixed(2);
    const link = builder.addMinimumAmount(amount).build();
    expect(link).toContain(amount);
  });
});
