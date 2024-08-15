export default function ImageLoader({ src }) {
  return `${process.env.NEXT_PUBLIC_IMG_BASE_URL}${src}`;
}
