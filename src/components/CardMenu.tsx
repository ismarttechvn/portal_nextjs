import Link from "next/link";

type CardMenuProp = {
  icName: string;
  title: string;
  description: string;
  navText: string;
  navLink: string;
  bstText: string;
};

export function CardMenu({
  icName,
  title,
  description,
  navText,
  navLink,
  bstText,
}: CardMenuProp) {
  return (
    <div className="card card-hover my-2" style={{ minHeight: "200px" }}>
      <div className="card-body">
        <h5 className="card-title">
          <span
            className={`material-symbols-outlined ${bstText}`}
            style={{ fontSize: "40px" }}
          >
            {icName}
          </span>
        </h5>
        <h5 className="card-subtitle mb-2 text-body-secondary"></h5>
        <h5 className="fw-bold">{title}</h5>
        <p className="card-text">{description}</p>
        <Link href={navLink} passHref>
          <a className="card-link">{navText}</a>
        </Link>
      </div>
    </div>
  );
}
