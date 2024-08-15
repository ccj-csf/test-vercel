const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('6637464565:AAGSl2WZ79uCJHAxswlyFE7LtZqnrcM0duA', {
  // botInfo: {
  //   first_name: 'dev_chx_bot1',
  //   username: 'dev_chx_bot1',
  //   can_join_groups: true,
  //   can_read_all_group_messages: true,
  //   supports_inline_queries: false,
  //   can_connect_to_business: false,
  // },
});

// bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));
// // Handle other messages.
// bot.on('message', (ctx) => ctx.reply('Got another message!888'));

const LEARN_MORE_URL = 'https://t.me/CharacterX_News';
const TELEGRAM_URL = 'https://t.me/CharacterX_Group';
const TWITTER_URL = 'https://twitter.com/CharacterXAI';
const HOW_TO_PLAY_URL = 'https://miniapp.characterx.ai/how-to-play';

async function start() {
  // await bot.init();
  // console.log(bot.botInfo);

  // 设置菜单命令
  await bot.api.setMyCommands([
    { command: 'start', description: 'Launch Mini App' },
    { command: 'twitter', description: 'Follow us on X(Twitter)' },
    { command: 'community', description: 'Join our community' },
    { command: 'guide', description: 'How to play' },
    { command: 'more', description: 'Learn more' },
  ]);

  const inlineKeyboard = new InlineKeyboard()
    .webApp('Launch Mini App', 'https://127.0.0.1:3000')
    .row()
    .url('X(Twitter)', 'https://twitter.com/CharacterXAI')
    .url('Community', 'https://t.me/CharacterX_Group')
    .row()
    .url('How to play?', 'https://miniapp.characterx.ai/how-to-play')
    .url('Learn more', 'https://t.me/CharacterX_News');

  bot.command('start', (ctx) =>
    ctx.replyWithPhoto('https://miniapp.characterx.ai/imgs/chx-miniapp-banner.png', {
      reply_markup: inlineKeyboard,
      caption: `CharacterX MiniApp is a streamlined experience designed for Telegram community members, focused on CAI Points earning and simple interactions with AI characters.

⛏️Mine CAI Points: Accumulate CAI Points by enjoying mini games, inviting friends, starting Auto AI Squad Mining, and claiming your SDID for rewards.
💬Engage with AI Characters: Enjoy engaging chats with various characters on the go. Experience the magic of the AI world.

Experience the essentials of CharacterX in a compact and convenient format with our MiniApp.`,
    }),
  );

  bot.command('twitter', (ctx) => {
    ctx.reply(`Follow us on X(Twitter): ${TWITTER_URL}`);
  });
  bot.command('community', (ctx) => {
    ctx.reply(`Join our telegram community: ${TELEGRAM_URL}`);
  });

  bot.command('more', (ctx) => {
    ctx.reply(`Learn more about CharacterX: ${LEARN_MORE_URL}`);
  });

  // bot.on("message", async (ctx) => {
  //   const message = ctx.message; // 消息对象
  //   console.log(ctx, message);
  // });

  bot.start();
}

start();
