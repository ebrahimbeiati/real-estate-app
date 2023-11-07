import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";




export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
      return  res.status(200).json(listing);
    } catch (err) {
        next(err);
    }
}
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"))

    if (req.user.id !== listing.userRef) return next(errorHandler(401, "You are not allowed to delete this listing"))

    try {
    await Listing.findByIdAndDelete(req.params.id);
      return  res.status(200).json('listing has been deleted');
    } catch (err) {
        next(err);
    }
}

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listings!"));
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Invalid listing ID",
        });
    }
      next(error);
  }
}


export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    return res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

  


