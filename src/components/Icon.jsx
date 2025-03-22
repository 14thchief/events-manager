const ImageIcon = ({ size, imageSrc }) => {
  return (
    <div
      className={`w-[${size}] min-w-[${size}px] max-w-[${size}px] h-[${size}] min-h-[${size}px] max-h-[${size}px]`}
    >
      <img src={imageSrc} alt="icon" className="max-w-full max-h-full" />
    </div>
  );
};

export default ImageIcon;
