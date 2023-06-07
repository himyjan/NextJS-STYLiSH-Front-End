import Link from 'next/link';

interface Category {
  hasNext: boolean;
  id: string;
  curCategory: string;
  onClick: (category: string) => void;
  text: string;
}

const CATEGORY_CLASS_NAME =
  'h-[50px] flex justify-center flex-1 items-center text-center bg-dark-grey font-norma text-[20px] hover:text-white cursor-pointer xl:bg-white xl:hover:text-brown xl:tracking-category-xl xl:-mr-[30px] xl:w-[150px] xl:flex-grow-0 xl:min-w-[150px]';

const Category = ({ hasNext, id, curCategory, onClick, text }: Category) => {
  if (hasNext) {
    return (
      <>
        <div
          className={
            id === curCategory
              ? `${CATEGORY_CLASS_NAME} text-white xl:text-brown`
              : `${CATEGORY_CLASS_NAME} text-grey xl:text-light-black`
          }
          id={id}
          onClick={() => {
            onClick(id);
          }}
          role="presentation"
        >
          <Link
            href={{
              pathname: '/',
              query: { category: id },
            }}
            style={{ width: '100%' }}
          >
            {text}
          </Link>
        </div>
        <div className="h-[20px] border-l border-grey xl:border-light-black" />
      </>
    );
  }
  return (
    <div
      className={
        id === curCategory
          ? `${CATEGORY_CLASS_NAME} text-white xl:text-brown`
          : `${CATEGORY_CLASS_NAME} text-grey xl:text-light-black`
      }
      id={id}
      onClick={() => {
        onClick(id);
      }}
      role="presentation"
    >
      <Link
        href={{
          pathname: '/',
          query: { category: id },
        }}
        style={{ width: '100%' }}
      >
        {text}
      </Link>
    </div>
  );
};

export default Category;
