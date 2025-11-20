import {formatText} from '~/lib/utils';

export function Heading({as: Component = 'h2', children, format, ...props}) {
  return (
    <Component
      {...props}
      className="neonText text-2xl lg:text-5xl bg-black inline-block bg-opacity-20 font-texas lowercase text-[#f13030] mx-auto px-2 text-center"
    >
      {format ? formatText(children) : children}
    </Component>
  );
}
