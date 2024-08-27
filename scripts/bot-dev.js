const { Bot, InlineKeyboard, API_CONSTANTS } = require('grammy');

const bot = new Bot('7370641465:AAEtgSnlRZRWiNiKpuV96ALarkxIcnuCdtc', {});

const LEARN_MORE_URL = 'https://t.me/CharacterX_News';
const TELEGRAM_URL = 'https://t.me/CharacterX_Group';
const TWITTER_URL = 'https://twitter.com/CharacterXAI';

async function start() {
  bot.api.setChatMenuButton({
    menu_button: {
      type: 'web_app',
      text: 'Play-vercel',
      web_app: {
        url: `https://test-vercel-one-blush.vercel.app/login`,
      },
    },
  });

  bot.command('start', (ctx) => {
    const arr = ctx.message?.text?.split(' ') || [];
    const startParam = arr.length >= 2 ? arr[1] : '';
    // let url = `https://develop.wav-miniapp.pages.dev`;
    let url = `https://test-vercel-one-blush.vercel.app/login`;

    if (startParam) {
      url += `?startParam=${startParam}`;
    }

    const inlineKeyboard = new InlineKeyboard().webApp('Start', url).row();
    console.log('🚀 ~ bot.command ~ inlineKeyboard:', inlineKeyboard);
    // .url('X(Twitter)', 'https://twitter.com/CharacterXAI')
    // .url('Community', 'https://t.me/CharacterX_Group')
    // .row()
    // .url('How to play?', 'https://miniapp.characterx.ai/how-to-play')
    // .url('Airdrop News', 'https://t.me/CharacterX_News');

    // return ctx.replyWithPhoto('https://test-vercel-one-blush.vercel.app/icons/logo.svg', {
    //   reply_markup: inlineKeyboard,
    //   caption: `Wav Mini App`,
    // });
    return ctx.reply(`Wav Mini App`, {
      reply_markup: inlineKeyboard,
    });
  });

  await bot.start({
    allowed_updates: API_CONSTANTS.ALL_UPDATE_TYPES,
  });
}

start();
