interface GoogleMapProps {
  address: string;
  className?: string;
  height?: string;
}

const GoogleMap = ({ address, className = "", height = "300px" }: GoogleMapProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const encodedAddress = encodeURIComponent(address);
  
  // Se houver chave da API, usa a API de Embed oficial
  // Caso contrário, usa uma URL alternativa que funciona sem chave
  const mapUrl = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`
    : `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className={`w-full rounded-lg overflow-hidden shadow-elegant ${className}`}>
      {!apiKey && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-t-lg p-2 text-xs text-yellow-800 dark:text-yellow-200 text-center">
          ⚠️ Configure VITE_GOOGLE_MAPS_API_KEY no arquivo .env para melhor experiência
        </div>
      )}
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
