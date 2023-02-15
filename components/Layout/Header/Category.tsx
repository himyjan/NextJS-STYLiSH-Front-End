import Link from "next/link";

interface Category {
  hasNext: boolean;
  id: string;
  curCategory: string;
  onClick: () => void;
  text: string;
}

const CATEGORY_CLASS_NAME =
  "h-[50px] flex justify-center items-center flex-1 text-center bg-dark-grey font-norma text-[20px] hover:text-white cursor-pointer";

const Category = ({ hasNext, id, curCategory, onClick, text }: Category) => {
  if (hasNext) {
    return (
      <>
        <div
          className={
            id === curCategory
              ? `${CATEGORY_CLASS_NAME} text-white`
              : `${CATEGORY_CLASS_NAME} text-grey`
          }
          id={id}
          onClick={onClick}
          role="presentation"
        >
          <Link
            href={{
              pathname: "/",
              query: { category: id },
            }}
            style={{ width: "100%" }}
          >
            {text}
          </Link>
        </div>
        <div className="h-[20px] border-l border-grey" />
      </>
    );
  }
  return (
    <div
      className={
        id === curCategory
          ? `${CATEGORY_CLASS_NAME} text-white`
          : `${CATEGORY_CLASS_NAME} text-grey`
      }
      id={id}
      onClick={onClick}
      role="presentation"
    >
      <Link
        href={{
          pathname: "/",
          query: { category: id },
        }}
        style={{ width: "100%" }}
      >
        {text}
      </Link>
    </div>
  );
};

export default Category;
