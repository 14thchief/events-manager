const ImageIcon = ({ size, imageSrc }) => {
  return (
    <div
      className={`w-[${size}] min-w-[${size}] max-w-[${size}] h-[${size}] min-h-[${size}] max-h-[${size}]`}
    >
      <img src={imageSrc} alt="icon" className="w-full h-full" />
    </div>
  );
};

export default ImageIcon;
