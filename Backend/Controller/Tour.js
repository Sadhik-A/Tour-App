
const Tour = require("../models/Tours");
module.exports.add = async (req, res) => {
  console.log(req.body);

  try {
   
    const { Tourname, TourDescription, TourImage,Userid } = req.body;
    // console.log(req.body);
    // console.log(TourImage); 
  
    const tour = new Tour({ Tourname, TourDescription, TourImage,Userid});
    // console.log(tour)
    await tour.save();
    res.status(201).json("Tour added successfully");
  } catch (error) {
    // console.log(error);
      res.status(500).json({ error: "Internal server error." })
  }


};
module.exports.getTourlist = async (req, res) => {
  try {
    const Tours = await Tour.fetchAll();
    // console.log(Tours);
    res.json(Tours);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching tours" });
  }
};
module.exports.deleteTour = async (req, res) => {
  // console.log(req.params.id)
    const id  = req.params.id;
  let tour = await Tour.where({ id }).fetch();
  if (req.is_admin||req.userId==tour.get("Userid")) {
    try {
      let tour = await Tour.where({ id }).destroy();
      return res.status(200).json({ message: "tour deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting Tours" });
    }
  }
return res.status(401).json("You are not authorized to delete tour");
 
};

module.exports.editTour = async (req, res) => {
  const id = req.body.TourId;
  const tour = await Tour.where({ id }).fetch();
  if (req.is_admin || req.userId == tour.get("Userid")) {
      try{
       const { Tourname, TourImage, TourDescription } = req.body;
    // console.log(id)
    // console.log(req.body);
    const tour = await Tour.where({ id }).fetch();
    // console.log(tour)
     const updatedFields = {
       Tourname,
       TourImage,
       TourDescription,
     };
    await tour.save(updatedFields, { patch: true });
    return res.status(200).json({ message: "Tour Updated successfuly" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
    }
    return res.status(401).json("You are not authorized to edit tour");
   
};

module.exports.likeTour = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const tour = await Tour.where({ id }).fetch();
    // console.log(tour)
    const updatedFields = {
      likes: tour.get("likes") + 1,
    };
    await tour.save(updatedFields, { patch: true });
    return res.status(200).json({ likes: updatedFields.likes });
  } catch (err) {
    return res.status(500).json(err.message);
  }
}
module.exports.dislikeTour = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const tour = await Tour.where({ id }).fetch();
    // console.log(tour)
    const updatedFields = {
      likes: tour.get("likes") - 1,
    };
    await tour.save(updatedFields, { patch: true });
    return res.status(200).json({ likes: updatedFields.likes });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};