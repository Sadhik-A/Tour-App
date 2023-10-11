
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
    res.status(201).json({ message: "Tour added successfully" });
  } catch (error) {
      res.status(500).json(error.message);
  }


};
module.exports.getTourlist = async (req, res) => {
  try {
    const Tours = await Tour.fetchAll();
    // console.log(Tours);
    res.status(200).json(Tours);
  } catch (error) {
    res
      .status(500)
      .json(error.message);
  }
};
module.exports.deleteTour = async (req, res) => {
  // console.log(req.params.id)
    const id  = req.params.id;
  let tour = await Tour.where({ id }).fetch();
  try {
    if (req.is_admin || req.userId == tour.get("Userid")) {
      let tour = await Tour.where({ id }).destroy();
      return res.status(200).json({ message: "tour deleted successfully" });
    } else {
      return res.status(401).json({ message: "You are not authorized to delete tour" });
    }
  }
   catch (error) {
     res.status(500).json(error.message);
   }
};

module.exports.editTour = async (req, res) => {
  const id = req.body.TourId;
  const tour = await Tour.where({ id }).fetch();
  try {
    if (req.is_admin || req.userId == tour.get("Userid")) {
    
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
    }
    else {
      return res.status(401).json({ message: "You are not authorized to edit tour" });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
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
    return res.status(200).json({ likes: updatedFields.likes,message: "Tour liked successfully" });
  } catch (err) {
     res.status(500).json(err.message);
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