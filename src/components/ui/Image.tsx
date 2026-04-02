import type { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export function Image({ loading = 'lazy', decoding = 'async', ...props }: ImageProps) {
  return <img loading={loading} decoding={decoding} {...props} />;
}