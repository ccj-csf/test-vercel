import { NextResponse } from 'next/server';
export const runtime = 'edge';
// 模拟应用配置的数据
const defaultPlaylist = [
  {
    id: '1',
    title: 'Suno Please Fix',
    cover: 'https://cdn2.suno.ai/5b83f352-1956-4ca2-8534-2af03bf76863_aace3111.jpeg',
    style: 'Pop',
    desc: 'A popular song by SirBitesAlot.',
    lyrics: 'La la la la...',
    sourceUrl: 'https://cdn1.suno.ai/5b83f352-1956-4ca2-8534-2af03bf76863.mp3',
    artist: 'SirBitesAlot',
  },
  {
    id: '2',
    title: 'Where Do We Go From Here?',
    cover: 'https://cdn2.suno.ai/image_1c24de5d-28bc-44f4-bac3-93a8a3ab3604.jpeg',
    style: 'Rock',
    desc: 'A rock song by sushileaf 🍣🍃',
    lyrics: 'Rock and roll...',
    sourceUrl: 'https://cdn1.suno.ai/290fc7e0-4796-4c05-a0c0-8c92e1e2827a.mp3',
    artist: 'sushileaf 🍣🍃',
  },
  {
    id: '3',
    title: 'Free Fallin',
    cover: 'https://cdn2.suno.ai/9b3a0739-ebad-4a3b-97eb-40dabf4186b5_5d97716c.jpeg',
    style: 'Rock',
    desc: 'A rock song by sushileaf 🍣🍃',
    lyrics: 'Rock and roll...',
    sourceUrl: 'https://cdn1.suno.ai/5a285fbc-f64a-418a-8b2e-05e3e7990899.mp3',
    artist: 'free',
  },
];

export async function GET() {
  return NextResponse.json({
    data: defaultPlaylist,
  });
}
