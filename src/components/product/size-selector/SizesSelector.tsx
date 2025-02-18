import { ValidSizes } from "@/interfaces/product";
import clsx from "clsx";

interface Props {
  selectedSize?: ValidSizes;
  vailableSizes: ValidSizes[];
  onSizeChange: (size: ValidSizes) => void;
}

export const SizesSelector = ({
  selectedSize,
  vailableSizes,
  onSizeChange,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="text-3xl mb-4">Tallas disponibles</h3>

      <div className="flex">
        {vailableSizes.map((size) => (
          <button
            onClick={() => onSizeChange(size)}
            key={size}
            className={clsx("hover:underline mx-2 text-lg", {
              underline: selectedSize === size,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
