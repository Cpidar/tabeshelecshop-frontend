import Image from 'next/image';
import Link from "next/link"
import searchProductPlaceholder from '@/images/placeholders/product.png';

type SearchProductProps = {
  item: any;
};

const SearchProduct: React.FC<SearchProductProps> = ({ item }) => {
  return (
    <Link
      href={`products/${item?.slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-12 h-12 overflow-hidden rounded-md cursor-pointer shrink-0 ltr:mr-4 rtl:ml-4">
        <Image
          src={item?.image?.thumbnail ?? searchProductPlaceholder}
          width={48}
          height={48}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-fill-thumbnail"
        />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-brand-dark text-15px">{item.name}</h3>
      </div>
    </Link>
  );
};

export default SearchProduct;
