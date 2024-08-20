const { Bot, InlineKeyboard, API_CONSTANTS } = require('grammy');

const bot = new Bot('7370641465:AAEtgSnlRZRWiNiKpuV96ALarkxIcnuCdtc', {});

const LEARN_MORE_URL = 'https://t.me/CharacterX_News';
const TELEGRAM_URL = 'https://t.me/CharacterX_Group';
const TWITTER_URL = 'https://twitter.com/CharacterXAI';
const HOW_TO_PLAY_URL = 'https://miniapp.characterx.ai/how-to-play';

const activeUser = (data) => {
  return fetch('https://sandbox-api.characterx.ai/tg/v1/bot/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};

const successfulPaymentCallback = (data) => {
  return fetch('https://sandbox-api.characterx.ai/tg/v1/mining/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};

const botActive = (data) => {
  return fetch('https://sandbox-api.characterx.ai/tg/v1/bot/active', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
    }),
  });
};

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
    let url = `https://develop.wav-miniapp.pages.dev/login`;

    if (startParam) {
      url += `?startParam=${startParam}`;
    }

    const inlineKeyboard = new InlineKeyboard()
      .webApp('Play', url)
      .row()
      .url('X(Twitter)', 'https://twitter.com/CharacterXAI')
      .url('Community', 'https://t.me/CharacterX_Group')
      .row()
      .url('How to play?', 'https://miniapp.characterx.ai/how-to-play')
      .url('Airdrop News', 'https://t.me/CharacterX_News');

    return ctx.replyWithPhoto('https://d1skldygiinxua.cloudfront.net/website/20240726-170208.png', {
      reply_markup: inlineKeyboard,
      caption: `CharacterX Mini `,
    });
  });
  bot.command('twitter', (ctx) => {
    ctx.reply(`Follow us on X(Twitter): ${TWITTER_URL}`);
  });
  bot.command('community', (ctx) => {
    ctx.reply(`Join our telegram community: ${TELEGRAM_URL}`);
  });

  bot.command('more', (ctx) => {
    ctx.reply(`Learn more about CharacterX: ${LEARN_MORE_URL}`);
  });

  await bot.api.getUpdates({
    allowed_updates: API_CONSTANTS.ALL_UPDATE_TYPES,
    timeout: 10000000,
  });

  bot.on('pre_checkout_query', async (ctx) => {
    console.log(ctx?.update);
    const preCheckoutQueryId = ctx?.update?.pre_checkout_query?.id;
    if (preCheckoutQueryId) {
      await bot.api.answerPreCheckoutQuery(preCheckoutQueryId, true);
    }
  });

  bot.on('channel_post', async (ctx) => {
    console.log('channel_post');
    console.log(ctx.update.channel_post);
  });
  bot.on('message', async (ctx) => {
    const message = ctx.message; // 消息对象
    console.log(message);
    if (message.successful_payment) {
      const successfulPayment = message.successful_payment;
      const data = JSON.parse(successfulPayment?.invoice_payload || '{}');
      try {
        const res = await successfulPaymentCallback({
          order_id: data.order_id,
          user_id: data.user_id,
        });

        const resData = await res.json();
        if (resData.code === 200) {
          console.log('insert');
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (message?.text === 'hi') {
      botActive({
        tg_id: message?.from?.id,
      });
    }

    try {
      const res = await activeUser({
        id: message.from.id,
        username: message.from.username,
        first_name: message.from.first_name,
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
  });

  await bot.start({
    allowed_updates: API_CONSTANTS.ALL_UPDATE_TYPES,
  });
}

start();
