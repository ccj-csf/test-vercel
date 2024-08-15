const { Bot } = require('grammy');

function start(token, isProd = false) {
  const bot = new Bot(token);
  let webhook = `https://test.miniapp.characterx.ai/api/v1/webhook/bot`;

  if (isProd) {
    webhook = `https://miniapp.characterx.ai/api/v1/webhook/bot`;
  }

  void bot.api.setMyCommands([
    { command: 'start', description: 'Launch Mini App' },
    { command: 'twitter', description: 'Follow us on X(Twitter)' },
    { command: 'community', description: 'Join our community' },
    { command: 'guide', description: 'How to play' },
    { command: 'more', description: 'Learn more' },
  ]);
  // bot.api.setChatMenuButton({})
  void bot.api.setWebhook(webhook);
}
module.exports = {
  start,
};
