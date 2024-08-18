const { Bot, API_CONSTANTS } = require('grammy');

function start(token, isProd = false) {
  const bot = new Bot(token);
  let webhook = `https://test.miniapp.characterx.ai/api/v1/webhook/bot`;
  let webAppUrl = `https://develop.wav-miniapp.pages.dev/login`;

  if (isProd) {
    webhook = `https://miniapp.characterx.ai/api/v1/webhook/bot`;
    webAppUrl = `https://develop.wav-miniapp.pages.dev/login`;
  }

  void bot.api.setChatMenuButton({
    menu_button: {
      type: 'web_app',
      text: '打开',
      web_app: {
        url: webAppUrl,
      },
    },
  });
  void bot.api.setWebhook(webhook, {
    allowed_updates: API_CONSTANTS.ALL_UPDATE_TYPES,
  });
}
module.exports = {
  start,
};
