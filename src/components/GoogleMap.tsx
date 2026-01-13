interface GoogleMapProps {
  address: string;
  className?: string;
  height?: string;
}

const GoogleMap = ({ address, className = "", height = "300px" }: GoogleMapProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`;

  return (
    <div className={`w-full rounded-lg overflow-hidden shadow-elegant ${className}`}>
      <iframe
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        title={`Mapa de ${address}`}
      />
    </div>
  );
};

export default GoogleMap;
