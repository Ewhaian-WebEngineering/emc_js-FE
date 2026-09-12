export default function Image({ eager = false, src, width = 400, ...props }) {
  const isLocalPreview = src?.startsWith('blob:') || src?.startsWith('data:');

  const resizedSrc = isLocalPreview
    ? src
    : `https://images.weserv.nl/?url=${encodeURIComponent(
        src.replace(/^https?:\/\//, ''),
      )}&w=${width}&output=webp`;

  return <img src={resizedSrc} loading={eager ? 'eager' : 'lazy'} {...props} />;
}
