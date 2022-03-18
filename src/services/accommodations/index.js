import express from "express";
import createHttpError from "http-errors";
import accommodationsModel from "./schema.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import q2m from "query-to-mongo";
// import { basicAuthMiddleware } from "../../auth/basic.js";
// import { JWTAuthMiddleware } from "../../auth/token.js";
// const cloudinaryStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "strivago",
//   },
// });

const accommodationsRouter = express.Router();

accommodationsRouter.post(
  "/",
  /* basicAuthMiddleware */ async (req, res, next) => {
    try {
      const newAccommodation = new accommodationsModel({
        ...req.body,
        host: [req.user._id],
      });
      const { _id } = await newAccommodation.save();
      res.status(201).send({ _id });
    } catch (error) {
      next(error);
    }
  }
);

accommodationsRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const total = await accommodationsModel.countDocuments(mongoQuery.criteria);
    const accommodations = await accommodationsModel
      .find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort);
    res.send({
      links: mongoQuery.links("/accommodations", total),
      total,
      totalPages: Math.ceil(total / mongoQuery.options.limit),
      accommodations,
    });
  } catch (error) {
    next(error);
  }
});

accommodationsRouter.get(
  "/:accommodationId",
   async (req, res, next) => {
    try {
      const accommodationId = req.params.accommodationId;

      const accommodation = await accommodationsModel.findById(accommodationId);
      if (accommodation) {
        res.send(accommodation);
      } else {
        next(
          createHttpError(
            404,
            `accommodation with id ${accommodationId} not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

accommodationsRouter.put(
  "/:accommodationId",/* basicAuthMiddleware */
  async (req, res, next) => {
    try {
      const accommodationId = req.params.accommodationId;
      const updatedAccommodation = await accommodationsModel.findOne({
        _id: accommodationId,
        host: { $in: [req.user._id] },
      });
      if (updatedAccommodation) {
        await updatedAccommodation.update(req.body);
        res.send(204).send();
      } else {
        next(createHttpError(404, `accommodation with id ${accommodationId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

accommodationsRouter.delete(
  "/:accommodationId", /* basicAuthMiddleware */
  
  async (req, res, next) => {
    try {
      const accommodationId = req.params.accommodationId;
      const deletedAccommodation = await accommodationsModel.findByIdAndDelete(
        accommodationId
      );
      if (deletedAccommodation) {
        res.status(204).send();
      } else {
        next(createHttpError(404, `accommodation with id ${accommodationId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

// accommodationsRouter.post(
//   "/:accommodationId/cover",
//   multer({ storage: cloudinaryStorage }).single("cover"),
//   async (req, res, next) => {
//     try {
//       const accommodationId = req.params.accommodationId;
//       const updatedaccommodation = await accommodationsModel.findByIdAndUpdate(
//         accommodationId,
//         { cover: req.file.path } /*  cover: req.file.path, */,
//         {
//           /* cover: req.file.path */
//           new: true, // by default findByIdAndUpdate returns the record pre-modification, if you want to get back the newly updated record you should use the option new: true
//         }
//       );
//       if (updatedaccommodation) {
//         res.send(updatedaccommodation);
//       } else {
//         next(createHttpError(404, `accommodation with id ${accommodationId} not found!`));
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// accommodationsRouter.post("/:accommodationId/comments", async (req, res, next) => {
//   try {
//     const updatedaccommodation = await accommodationsModel.findByIdAndUpdate(
//       req.params.accommodationId,
//       { $push: { comments: req.body } },
//       { new: true }
//     );
//     if (updatedaccommodation) {
//       res.send(updatedaccommodation);
//     } else {
//       next(createHttpError(404, `accommodation with id ${accommodationId} not found!`));
//     }
//   } catch (error) {}
// });

// accommodationsRouter.get("/:accommodationId/comments", async (req, res, next) => {
//   try {
//     const accommodation = await accommodationsModel.findById(req.params.accommodationId);
//     if (accommodation) {
//       res.send(accommodation.comments);
//     } else {
//       next(
//         createHttpError(
//           404,
//           `accommodation with Id ${req.params.accommodationId} not found!`
//         )
//       );
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// accommodationsRouter.get(
//   "/:accommodationId/comments/:commentId",
//   async (req, res, next) => {
//     try {
//       const accommodation = await accommodationsModel.findById(req.params.accommodationId);
//       const comment = accommodation.comments?.find(
//         (comment) => comment._id.toString() === req.params.commentId
//       );
//       if (comment) {
//         res.send(comment);
//       } else {
//         next(
//           createHttpError(
//             404,
//             `accommodation with Id ${req.params.accommodationId} not found!`
//           )
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// accommodationsRouter.put(
//   "/:accommodationId/comments/:commentId",
//   async (req, res, next) => {
//     try {
//       const accommodation = await accommodationsModel.findById(req.params.accommodationId); // user is a MONGOOSE DOCUMENT, it is NOT A PLAIN OBJECT
//       if (accommodation) {
//         const index = accommodation.comments.findIndex(
//           (comment) => comment._id.toString() === req.params.commentId
//         );

//         if (index !== -1) {
//           // we can modify user.purchaseHistory[index] element with what comes from request body
//           accommodation.comments[index] = {
//             ...accommodation.comments[index].toObject(), // DO NOT FORGET .toObject() when spreading
//             ...req.body,
//           };

//           await accommodation.save(); // since user is a MONGOOSE DOCUMENT I can use some of his special powers like .save() method
//           res.send(accommodation);
//         } else {
//           next(
//             createHttpError(
//               404,
//               `comment with id ${req.params.commentId} not found!`
//             )
//           );
//         }
//       } else {
//         next(
//           createHttpError(
//             404,
//             `accommodation with id ${req.params.accommodationId} not found!`
//           )
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// ); // modify single item from purchase history of a specific user

// accommodationsRouter.delete(
//   "/:accommodationId/comments/:commentId",
//   async (req, res, next) => {
//     try {
//       const modifiedaccommodation = await accommodationsModel.findByIdAndUpdate(
//         req.params.accommodationId, //WHO
//         { $pull: { comments: { _id: req.params.commentId } } }, // HOW
//         { new: true } // OPTIONS
//       );
//       if (modifiedaccommodation) {
//         res.send(modifiedaccommodation);
//       } else {
//         next(
//           createHttpError(
//             404,
//             `accommodation with Id ${req.params.accommodationId} not found!`
//           )
//         );
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default accommodationsRouter;
