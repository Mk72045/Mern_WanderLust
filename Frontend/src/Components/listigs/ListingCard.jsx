import React from "react";

function ListingCard({ listing }) {
  // console.log("listing is: ", listing);

  return (
    <div className="group overflow-hidden w-80 h-80 rounded-xl shadow-sm  transition basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
      <div className="">
        <img
          src={listing?.image?.url}
          alt={listing?.image?.filename}
          className="h-52 w-full object-cover rounded-t-xl group-hover:opacity-90 group-hover:scale-101"
        />
      </div>
      <div className="py-2">
        <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
        <p className="mt-2 text-gray-600">₹ {listing.price}</p>
      </div>
    </div>
  );
}

export default ListingCard;
