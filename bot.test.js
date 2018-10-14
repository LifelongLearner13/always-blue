const bot = require('./bot');

describe('bot', () => {
  test('return best confidence match', () => {
    const input = {
      msg_id: '387b8515-0c1d-42a9-aa80-e68b66b66c27',
      _text: 'how many people between Tuesday and Friday',
      entities: {
        metric: [
          {
            metadata: "{'code': 324}",
            value: 'metric_visitor',
            confidence: 0.9231,
          },
        ],
      },
    };
    const result = ['metric', 'metric_visitor'];
    expect(bot.extractEntity(input)).toEqual(result);
    expect(bot.extractEntity({})).toBeFalsy();
  });
  test('get greeting', () => {
    const result = bot.getGreeting();
    expect(result.length).toBe(2);
  });
});
