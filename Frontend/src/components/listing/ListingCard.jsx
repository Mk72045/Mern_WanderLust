import { NavLink } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <NavLink
      to={`/listings/${listing._id}`}
      key={listing._id}
      className={`m-4 shadow rounded-xl group  w-[80%] min-w-70 max-w-80`}
    >
      <div className="flex flex-col h-100 ">
        <img
          src={listing.image?.url}
          alt={listing.image?.filename}
          className="h-75 w-full rounded-t-xl object-cover transition duration-300 group-hover:opacity-90 group-hover:scale-[1.005]"
        />
        <div className="flex flex-col p-2">
          <h2 className="">{listing.title}</h2>
          <p className="font-semibold">{listing.price}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default ListingCard;
