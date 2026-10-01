import Placeholder from '@/assets/img/img_checker.png';

export default function Image({ eager = false, src, width = 400, ...props }) {
  const resolvedSrc = src?.endsWith('img_checker.png') ? Placeholder : src;

  const isRemote = /^https?:\/\//.test(resolvedSrc ?? '');

  const resizedSrc = isRemote
    ? `https://images.weserv.nl/?url=${encodeURIComponent(
        resolvedSrc.replace(/^https?:\/\//, ''),
      )}&w=${width}&we&output=webp`
    : resolvedSrc;

  return <img src={resizedSrc} loading={eager ? 'eager' : 'lazy'} {...props} />;
}
