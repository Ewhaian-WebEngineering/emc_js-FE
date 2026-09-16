export default function Image({ eager = false, src, width = 400, ...props }) {
  const isRemote = /^https?:\/\//.test(src ?? '');

  const resizedSrc = isRemote
    ? `https://images.weserv.nl/?url=${encodeURIComponent(
        src.replace(/^https?:\/\//, ''),
      )}&w=${width}&output=webp`
    : src;

  return <img src={resizedSrc} loading={eager ? 'eager' : 'lazy'} {...props} />;
}
