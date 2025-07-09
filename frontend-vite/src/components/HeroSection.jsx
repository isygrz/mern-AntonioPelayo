import { Link } from 'react-router-dom';

const HeroSection = ({ title, subtitle, ctaText, ctaLink, image }) => {
  return (
    <div className="relative w-full h-[28rem] overflow-hidden rounded-xl shadow mb-10">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 text-center text-white p-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">{title}</h2>
        <p className="text-md md:text-xl mb-4">{subtitle}</p>
        <Link
          to={ctaLink}
          className="bg-white text-black px-6 py-2 rounded hover:bg-slate-100 text-sm font-medium"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
