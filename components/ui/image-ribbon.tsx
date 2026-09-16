import Image from 'next/image';

const ImageRibbon = ({ src }: { src: string }) => {
  return (
    <div className="relative h-[220px] md:h-[315px]">
      <Image
        className="object-cover h-full"
        src={src}
        alt="building"
        fill
        priority={true}
      />
    </div>
  );
};

export default ImageRibbon;
