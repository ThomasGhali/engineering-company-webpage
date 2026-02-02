import NextImage from 'next/image';

export default function SignInHeader() {
  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4">
        <NextImage
          src="/latest-logo2.png"
          alt="logo"
          width={130}
          height={36}
          className="w-[130px] lg:w-[150px]"
          priority
        />
        <div className="h-px w-12 bg-zinc-800" />
      </div>

      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Admin access</h1>
        <p className="text-zinc-400 text-sm">
          Please enter your credentials to continue
        </p>
      </div>
    </>
  );
}
