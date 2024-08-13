import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface Props {
  itemKey: string;
  itemValue: string;
  itemName: string
}

export const FilteredItem = ({ itemKey, itemValue, itemName }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  console.log(itemKey, itemValue)
  function handleClose() {
    const params = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
    params.delete(itemKey, itemValue)

    const query = params.toString() ? `?${params.toString()}` : "";

    router.push(`${pathname}${query}`)


    // const currentItem = (query[itemKey]! as string)
    //   .split(',')
    //   .filter((i) => i !== itemValue);
    // delete query[itemKey];
    // router.push({
    //   pathname,
    //   query: {
    //     ...query,
    //     ...(!isEmpty(currentItem) ? { [itemKey]: currentItem.join(',') } : {}),
    //   },
    // });
  }
  return (
    <div
      className="group flex shrink-0 m-1 items-center border border-border-base rounded-lg text-13px px-2.5 py-1.5 capitalize text-brand-dark cursor-pointer transition duration-200 ease-in-out hover:border-brand"
      onClick={handleClose}
    >
      {itemName}
      <XMarkIcon className="text-sm h-4 w-4 text-body ltr:ml-2 rtl:mr-2 shrink-0 ltr:-mr-0.5 rtl:-ml-0.5 mt-0.5 transition duration-200 ease-in-out group-hover:text-heading" />
    </div>
  );
};
